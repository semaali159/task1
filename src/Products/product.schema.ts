import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/User/user.schema';
// import { Types } from 'mongoose';

@Schema()
export class Product {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId | User;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
