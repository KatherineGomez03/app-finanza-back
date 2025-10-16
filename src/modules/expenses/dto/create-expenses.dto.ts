import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  TransactionCategory,
  TransactionType,
} from 'src/modules/transactions/schemas/transaction.schema';

export class CreateExpensesDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsNotEmpty()
  @IsEnum(TransactionCategory)
  category: TransactionCategory;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  date: Date;
}
