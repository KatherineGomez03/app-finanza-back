import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseDocument } from '../../../common/schemas/base.schema';

export type TransactionDocument = BaseDocument & Transaction;

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export enum TransactionCategory {
  // Gastos
  FOOD = 'food',
  TRANSPORT = 'transport',
  HOUSING = 'housing',
  UTILITIES = 'utilities',
  ENTERTAINMENT = 'entertainment',
  HEALTH = 'health',
  EDUCATION = 'education',
  SHOPPING = 'shopping',
  OTHER_EXPENSE = 'other_expense',
  
  // Ingresos
  SALARY = 'salary',
  FREELANCE = 'freelance',
  INVESTMENT = 'investment',
  GIFT = 'gift',
  OTHER_INCOME = 'other_income',
}

@Schema({
  timestamps: true,
  collection: 'transactions',
})
export class Transaction {
  static name = 'Transaction';
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, autopopulate: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: String, enum: TransactionType, required: true })
  type: TransactionType;

  @Prop({ type: String, enum: TransactionCategory, required: true })
  category: TransactionCategory;

  @Prop()
  description: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ default: 0 })
  pointsEarned: number;

  @Prop({ default: [] })
  tags: string[];
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);