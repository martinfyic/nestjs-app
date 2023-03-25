import { Document } from 'mongoose';

export interface Product extends Document {
  readonly title: string;
  readonly price: number;
  readonly imageURL: string;
  readonly description: string;
  readonly stock: number;
  readonly createdAt: Date;
}
