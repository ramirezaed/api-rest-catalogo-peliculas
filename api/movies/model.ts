import { Schema, model } from "mongoose";

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    qualification: {
      type: Number,
      required: false,
      max: 10,
      min: 1,
      default: 0,
    },
    genres: {
      type: [String],
      validate: {
        validator: function (v: string[]) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "La película debe tener al menos un género.",
      },
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

export const Movie = model("Movie", movieSchema);
