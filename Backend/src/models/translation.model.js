import { Schema, model } from "mongoose";

const TranslationSchema = new Schema(
  {
    originalText: {
      type: String,
      required: true,
    },
    originalLanguage: {
      type: String,
      required: true,
    },
    translatedText: {
      type: String,
      required: true,
    },
    translatedLanguage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Translation = model("Translation", TranslationSchema);
