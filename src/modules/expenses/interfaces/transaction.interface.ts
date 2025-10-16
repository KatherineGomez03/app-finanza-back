import { Document, Types } from 'mongoose';
import { Transaction } from 'src/modules/transactions/schemas/transaction.schema';

export interface ITransaction
  extends Omit<Transaction, keyof Document>,
    Document {
  _id: Types.ObjectId;
}

export type CreateTransactionParams = Omit<Transaction, '_id'>;
export type UpdateTrasactionParams = Partial<Transaction>;
