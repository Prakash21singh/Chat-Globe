import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    originalText: {
      type: String,
      required: true,
    },

    translatedText: {
      type: String,
    },

    language: {
      type: String,
      required: true,
    }, // en

    translatedLanguage: {
      type: String,
    }, // hi
  },
  { timestamps: true }
);

export const Message = model("Message", MessageSchema);
