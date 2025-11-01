import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { createProductDto } from './dtos/createProductDto';
import { UpdateProductDto } from './dtos/updateProductDto';
import { ProductService } from './product.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/get-user.decorator';
// interface AuthRequest extends Request {
//   user: { userId: string; email: string };
// }
interface JwtPayload {
  userId: string;
  email: string;
  refreshToken?: string;
}

@ApiTags('Products')
@ApiBearerAuth('access-token')
@Controller('products')
@UseGuards(AuthGuard('jwt'))
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  create(@Body() dto: createProductDto, @GetUser() user: JwtPayload) {
    return this.productService.addProduct(dto, user.userId);
  }

  @Get()
  findAll() {
    return this.productService.get();
  }

  @Get('MyProduct')
  findMy(@GetUser() user: JwtPayload) {
    return this.productService.findByUser(user.userId);
  }

  @Get('user-product/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findByUser(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @GetUser() user: JwtPayload,
  ) {
    return this.productService.update(id, dto, user.userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @GetUser() user: JwtPayload) {
    return this.productService.delete(id, user.userId);
  }
}
