import { Schema } from 'mongoose';

export const ProductSchema = new Schema(
  {
    title: { type: String, require: true },
    price: { type: Number, require: true },
    imageURL: { type: String, require: true },
    description: String,
    stock: { type: Number, require: true },
  },
  { timestamps: true, versionKey: false },
);
