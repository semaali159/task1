import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/User/user.schema';
// import { Types } from 'mongoose';

@Schema()
export class Product {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId | User;
  @Prop({ index: true })
  tenantId: string;
  @Prop()
  name: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
