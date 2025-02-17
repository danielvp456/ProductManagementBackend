import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/schemas/user.schema';
import { Product } from '../../products/schemas/product.schema';

@Schema()
export class PurchasedProduct {
  @ApiProperty({ type: () => Product })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
  product: Product;

  @ApiProperty()
  @Prop({ required: true, min: 1 })
  quantity: number;

  @ApiProperty()
  @Prop({ required: true, min: 0 })
  unitPrice: number;
}

@Schema({ timestamps: true })
export class Invoice extends Document {
  @ApiProperty({ type: () => User })
  @Prop({
    type: {
      _id: { type: MongooseSchema.Types.ObjectId, ref: 'User' },
      name: String,
      email: String,
      role: String
    },
    required: true
  })
  user: User;

  @ApiProperty({ type: [PurchasedProduct] })
  @Prop([{ type: Object, required: true }])
  products: PurchasedProduct[];

  @ApiProperty()
  @Prop({ required: true, min: 0 })
  total: number;

  @ApiProperty()
  @Prop({ default: Date.now })
  purchaseDate: Date;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice); 