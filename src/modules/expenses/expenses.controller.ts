import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpensesDto } from './dto/create-expenses.dto';
import { ITransaction } from './interfaces/transaction.interface';
import { UpdateExpenses } from './dto/update-expenses.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TransactionResponseDto } from './interfaces/transaction-response.dto';
@ApiTags('expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post('')
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User has been successfully created.',
    type: TransactionResponseDto,
  })
  async create(@Body() createExpensesDto: CreateExpensesDto) {
    const transaction = await this.expensesService.create(createExpensesDto);
    return new TransactionResponseDto(transaction);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all transactions.',
    type: TransactionResponseDto,
  })
  async findById(@Param('id') userId: string) {
    const transactions = await this.expensesService.findById(userId);
    return transactions.map((t) => new TransactionResponseDto(t));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a transactions' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Transaction has been successfully updated.',
    type: TransactionResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() UpdateExpensesDto: UpdateExpenses,
  ) {
    const transaction = await this.expensesService.update(
      id,
      UpdateExpensesDto,
    );
    return new TransactionResponseDto(transaction);
  }

  @ApiOperation({ summary: 'Delete a transactions' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Transaction has been successfully deleted.',
    type: TransactionResponseDto,
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const transaction = await this.expensesService.delete(id);
    return new TransactionResponseDto(transaction);
  }
}
