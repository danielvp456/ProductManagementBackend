import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from './schemas/invoice.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';

@ApiTags('invoices')
@Controller('invoices')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new invoice (purchase products)' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Purchase completed successfully.',
    type: Invoice,
  })
  @Roles(UserRole.USER)
  @UseGuards(RolesGuard)
  async create(
    @Request() req,
    @Body() createInvoiceDto: CreateInvoiceDto,
  ): Promise<Invoice> {
    return this.invoicesService.create(req.user.userId, createInvoiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all invoices (admin) or user invoices (user)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns list of invoices',
    type: [Invoice],
  })
  async findAll(@Request() req): Promise<Invoice[]> {
    return this.invoicesService.findAll(
      req.user.userId,
      req.user.role === UserRole.ADMIN
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get invoice details by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns invoice details',
    type: Invoice,
  })
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  async findOne(@Param('id') id: string): Promise<Invoice | null> {
    return this.invoicesService.findOne(id);
  }

  @Get('analytics/purchases-last-month')
  @ApiOperation({ summary: 'Get number of purchases in the last month' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns number of purchases in the last month',
    type: Number,
  })
  async getPurchasesLastMonth(@Request() req): Promise<number> {
    return this.invoicesService.getPurchasesLastMonth(req.user.userId);
  }
} 