import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Invoice, InvoiceSchema } from './schemas/invoice.schema';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Invoice.name, schema: InvoiceSchema }]),
    ProductsModule
  ],
  providers: [InvoicesService],
  controllers: [InvoicesController],
  exports: [InvoicesService]
})
export class InvoicesModule {} 