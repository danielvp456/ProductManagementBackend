import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice, PurchasedProduct } from './schemas/invoice.schema';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { 
  InsufficientStockException,
  ApplicationException 
} from '../common/exceptions/application.exception';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
  ) {}

  async create(userId: string, createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    // Obtener la información completa del usuario
    const user = await this.usersService.findOne(userId);
    
    // Verificar disponibilidad de stock y calcular total
    const purchasedProducts: PurchasedProduct[] = [];
    let total = 0;

    for (const item of createInvoiceDto.items) {
      const product = await this.productsService.findOne(item.productId);

      // Verificar stock
      if (!await this.productsService.checkStock(item.productId, item.quantity)) {
        throw new InsufficientStockException();
      }

      purchasedProducts.push({
        product: product,
        quantity: item.quantity,
        unitPrice: product.price
      });

      total += product.price * item.quantity;
    }

    // Crear la factura con la información completa del usuario
    const invoice = new this.invoiceModel({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      products: purchasedProducts,
      total,
      purchaseDate: new Date()
    });
    // Actualizar stock de productos
    try {
      for (const item of createInvoiceDto.items) {
        await this.productsService.updateStock(item.productId, item.quantity);
      }
      return await invoice.save();
    } catch (error) {
      throw new ApplicationException(
        'Error processing purchase. Stock update failed.',
        500
      );
    }
  }

  async findAll(userId: string, isAdmin: boolean): Promise<Invoice[]> {
    const query = isAdmin ? {} : { 'user._id': userId };
    return this.invoiceModel
      .find(query)
      .populate('products.product')
      .exec();
  }

  async findOne(id: string): Promise<Invoice | null> {
    return this.invoiceModel
      .findById(id)
      .populate('products.product')
      .exec();
  }

  async getPurchasesLastMonth(userId: string): Promise<number> {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    return this.invoiceModel.countDocuments({
      'user._id': userId,
      purchaseDate: { $gte: lastMonth }
    });
  }
} 