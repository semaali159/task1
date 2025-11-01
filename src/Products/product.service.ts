/* eslint-disable @typescript-eslint/no-base-to-string */
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createProductDto } from './dtos/createProductDto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/User/user.service';
import { UpdateProductDto } from './dtos/updateProductDto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<Product>,
    private readonly userService: UsersService,
  ) {}
  public async addProduct(dto: createProductDto, userId: string) {
    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException();
    const newProduct = new this.ProductModel({ owner: user._id });
    return newProduct.save();
  }
  public async get() {
    const products = await this.ProductModel.find();
    if (!products) throw new NotFoundException('products not found');
    return products;
  }
  public async getById(id: string) {
    const product = await this.ProductModel.findById(id);
    if (!product) throw new NotFoundException('product not found');

    return product;
  }
  async update(id: string, dto: UpdateProductDto, userId: string) {
    const product = await this.ProductModel.findById(id);
    if (!product) throw new NotFoundException('product not found');
    if (product.owner.toString() !== userId) {
      throw new ForbiddenException('You can only update your own products');
    }
    return this.ProductModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string, userId: string) {
    const product = await this.ProductModel.findById(id);
    if (!product) throw new NotFoundException('product not found');
    if (product.owner.toString() !== userId) {
      throw new ForbiddenException('You can only delete your own products');
    }
    return this.ProductModel.findByIdAndDelete(id);
  }
  async findByUser(userId: string) {
    return this.ProductModel.find({ owner: userId })
      .populate('owner', 'name email')
      .exec();
  }
}
