import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { 
  ProductNotFoundException,
  InsufficientStockException 
} from '../common/exceptions/application.exception';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new ProductNotFoundException(id);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    if (updateProductDto.stock !== undefined && updateProductDto.stock < 0) {
      throw new InsufficientStockException();
    }

    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();

    if (!updatedProduct) {
      throw new ProductNotFoundException(id);
    }

    return updatedProduct;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new ProductNotFoundException(id);
    }
  }

  async checkStock(id: string, quantity: number): Promise<boolean> {
    const product = await this.findOne(id);
    return product.stock >= quantity;
  }

  async updateStock(id: string, quantity: number): Promise<Product> {
    const product = await this.findOne(id);
    if (product.stock < quantity) {
      throw new InsufficientStockException();
    }

    return this.update(id, { stock: product.stock - quantity });
  }
} 