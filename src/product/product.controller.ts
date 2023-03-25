import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
import { Product } from './interfaces/product.interface';
import { isValidMongoId } from '../utils/idValidator';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post('/create')
  async createProduct(
    @Res() res,
    @Body() createProductDTO: CreateProductDTO,
  ): Promise<{ message: string; products: Product[] }> {
    try {
      const newProduct = await this.productService.createProduct(
        createProductDTO,
      );
      return res.status(HttpStatus.CREATED).json({
        message: 'success',
        newProduct,
      });
    } catch (error) {
      throw new Error(
        `Failed to retrieve newProduct controller: ${error.message}`,
      );
    }
  }

  @Get('/')
  async getProducts(
    @Res() res,
  ): Promise<{ message: string; products: Product[] }> {
    try {
      const products = await this.productService.getProducts();
      if (products.length === 0) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Empty product list',
          products: [],
        });
      }
      return res.status(HttpStatus.OK).json({
        message: 'success',
        products,
      });
    } catch (error) {
      throw new Error(
        `Failed to retrieve products controller: ${error.message}`,
      );
    }
  }

  @Get('/:productID')
  async getProduct(
    @Res() res,
    @Param('productID') productID,
  ): Promise<{ message: string; products: Product[] }> {
    try {
      if (!isValidMongoId(productID)) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: `Invalid product ID: ${productID}`,
        });
      }
      const product = await this.productService.getProduct(productID);
      if (!product) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: `Product ID not found: ${productID}`,
        });
      }
      return res.status(HttpStatus.OK).json({
        message: 'success',
        product,
      });
    } catch (error) {
      throw new Error(
        `Failed to retrieve product controller: ${error.message}`,
      );
    }
  }

  @Delete('/delete/:productID')
  async deletedProduct(
    @Res() res,
    @Param('productID') productID,
  ): Promise<{ message: string; products: Product[] }> {
    try {
      if (!isValidMongoId(productID)) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: `Invalid product ID: ${productID}`,
        });
      }
      const deletedProduct = await this.productService.deleteProduct(productID);
      if (!deletedProduct) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: `Product ID not found: ${productID}`,
        });
      }
      return res.status(HttpStatus.OK).json({
        message: 'deleted',
        deletedProduct,
      });
    } catch (error) {
      throw new Error(
        `Failed to retrieve product controller: ${error.message}`,
      );
    }
  }

  @Put('/update/:productID')
  async updateProduct(
    @Res() res,
    @Param('productID') productID,
    @Body() data,
  ): Promise<{ message: string; products: Product[] }> {
    try {
      if (!isValidMongoId(productID)) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: `Invalid product ID: ${productID}`,
        });
      }
      const productUpdated = await this.productService.updateProduct(
        productID,
        data,
      );
      if (!productUpdated) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: `Product ID not found: ${productID}`,
        });
      }
      return res.status(HttpStatus.OK).json({
        message: 'updated',
        productUpdated,
      });
    } catch (error) {
      throw new Error(
        `Failed to retrieve productUpdated controller: ${error.message}`,
      );
    }
  }
}
