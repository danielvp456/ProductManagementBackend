import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested, Min, IsMongoId } from 'class-validator';

export class PurchaseItemDto {
  @ApiProperty({
    description: 'Product ID',
    example: '507f1f77bcf86cd799439011'
  })
  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    description: 'Quantity to purchase',
    example: 1,
    minimum: 1
  })
  @Min(1)
  quantity: number;
}

export class CreateInvoiceDto {
  @ApiProperty({
    type: [PurchaseItemDto],
    description: 'Array of products to purchase'
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseItemDto)
  items: PurchaseItemDto[];
} 