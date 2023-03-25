import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}
  async getProducts(): Promise<Product[]> {
    try {
      const products = await this.productModel.find().lean().exec();
      return products;
    } catch (error) {
      throw new Error(`Failed to retrieve products services: ${error.message}`);
    }
  }

  async getProduct(productID: string): Promise<Product> {
    try {
      const product = await this.productModel.findById(productID).lean().exec();
      return product;
    } catch (error) {
      throw new Error(`Failed to retrieve product services: ${error.message}`);
    }
  }

  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    try {
      const newProduct = await this.productModel.create(createProductDTO);
      return newProduct;
    } catch (error) {
      throw new Error(
        `Failed to retrieve newProduct services: ${error.message}`,
      );
    }
  }

  async deleteProduct(productID: string): Promise<Product> {
    try {
      const deletedProduct = await this.productModel.findByIdAndDelete(
        productID,
      );
      return deletedProduct;
    } catch (error) {
      throw new Error(
        `Failed to retrieve deletedProduct services: ${error.message}`,
      );
    }
  }

  async updateProduct(
    productID: string,
    createProductDTO: CreateProductDTO,
  ): Promise<Product> {
    try {
      const productUpdated = await this.productModel.findByIdAndUpdate(
        productID,
        createProductDTO,
        { new: true },
      );
      return productUpdated;
    } catch (error) {
      throw new Error(
        `Failed to retrieve productUpdated services: ${error.message}`,
      );
    }
  }
}
