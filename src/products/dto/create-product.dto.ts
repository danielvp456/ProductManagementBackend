import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEnum, Min } from 'class-validator';
import { ProductStatus } from '../schemas/product.schema';

export class CreateProductDto {
  @ApiProperty({
    example: 'Gaming Laptop',
    description: 'The name of the product',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'High-performance gaming laptop with RTX 3080',
    description: 'The description of the product',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 1499.99,
    description: 'The price of the product',
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    example: 10,
    description: 'The stock quantity of the product',
  })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({
    enum: ProductStatus,
    example: ProductStatus.ACTIVE,
    description: 'The status of the product',
  })
  @IsEnum(ProductStatus)
  status: ProductStatus;
} 