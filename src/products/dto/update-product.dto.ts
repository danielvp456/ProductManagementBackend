import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsOptional, IsNumber, Min } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;
} 