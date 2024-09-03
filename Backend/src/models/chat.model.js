import mongoose, { mongo } from "mongoose";

const ChatRoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

export const ChatRoom = model("ChatRoom", ChatRoomSchema);
