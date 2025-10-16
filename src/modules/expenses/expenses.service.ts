import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from '../transactions/schemas/transaction.schema';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ITransaction } from './interfaces/transaction.interface';
import { CreateExpensesDto } from './dto/create-expenses.dto';
import { UpdateExpenses } from './dto/update-expenses.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<ITransaction>,
  ) {}
  async create(createExpensesDto: CreateExpensesDto): Promise<ITransaction> {
    const transaction = new this.transactionModel({
      ...createExpensesDto,
    });
    const savedTransaction = await transaction.save();
    return savedTransaction;
  }

  async findById(id: string): Promise<ITransaction[]> {
    const transactions = await this.transactionModel
      .find({ userId: id })
      .exec();
    return transactions;
  }

  async update(
    id: string,
    UpdateExpensesDto: UpdateExpenses,
  ): Promise<ITransaction> {
    const transaction = await this.transactionModel
      .findOneAndUpdate({ _id: id }, UpdateExpensesDto)
      .exec();
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }

  async delete(id: string): Promise<ITransaction> {
    const deleted = await this.transactionModel.findByIdAndDelete({ _id: id });
    if (!deleted) {
      throw new NotFoundException('Transaction not found');
    }
    return deleted;
  }
}
