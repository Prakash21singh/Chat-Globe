import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";

export const SignUp = asyncHandler(async function (req, res) {
  const { username, email, password } = req.body;

  const hashedPass = await bcrypt.hash(password, 10);
  const existingUser = await User.findOne({
    username,
    email,
  });

  if (existingUser)
    throw new Error("User with this email and username already exists");

  const newUser = new User({
    username,
    email,
    password: hashedPass,
  });

  await newUser.save();
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, { httpOnly: true });
  res.status(201).json({ message: "User created successfully", token });
});

export const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new Error("Invalid email");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, { httpOnly: true });
  res.status(200).json({ message: "Login successful", token });
});

export const GetData = async function (req, res) {
  const userId = req.userId;

  const user = await User.findById(userId).select("_id image username email");

  res.status(200).json(user);
};

export const Logout = async function (req, res) {
  res.clearCookie("").json({ message: "Logged out successfully" });
};
