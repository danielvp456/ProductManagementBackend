import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Schema()
export class Product extends Document {
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  description: string;

  @ApiProperty()
  @Prop({ required: true, min: 0 })
  price: number;

  @ApiProperty()
  @Prop({ required: true, min: 0 })
  stock: number;

  @ApiProperty({ enum: ProductStatus })
  @Prop({ 
    type: String, 
    enum: ProductStatus, 
    default: ProductStatus.ACTIVE 
  })
  status: ProductStatus;
}

export const ProductSchema = SchemaFactory.createForClass(Product); 