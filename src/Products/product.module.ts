import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';
import { ProductService } from './product.service';
import { UsersModule } from 'src/User/user.module';
import { ProductController } from './product.controller';
import { JwtRefreshStrategy } from 'src/auth/strategies/jwt-refresh.strategy';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';
// import { UsersService } from 'src/User/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    UsersModule,
    AuthModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, JwtRefreshStrategy, JwtStrategy],
  exports: [ProductService],
})
export class ProductsModule {}
