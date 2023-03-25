import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';

@Controller('product')
export class ProductController {
  @Post('/create')
  createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    return res.status(HttpStatus.CREATED).json({
      message: 'El post fue exitoso',
    });
  }
}
