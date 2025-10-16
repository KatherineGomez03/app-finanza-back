import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import {
  TransactionCategory,
  TransactionType,
} from 'src/modules/transactions/schemas/transaction.schema';
import { ITransaction } from './transaction.interface';

@Exclude()
export class TransactionResponseDto {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  @ApiProperty()
  id: string;

  @Expose()
  @Transform(({ obj }) => obj.userId.toString())
  userId: string;

  @Expose()
  @ApiProperty({ example: 10000 })
  amount: number;

  @Expose()
  @ApiProperty({ example: TransactionType.INCOME, enum: TransactionType })
  type: TransactionType;

  @Expose()
  @ApiProperty({
    example: TransactionCategory.SALARY,
    enum: TransactionCategory,
  })
  category: TransactionCategory;

  @ApiProperty({ example: 'income from working overtime' })
  description?: string;

  @ApiProperty({ example: '2025-10-16 16:00:00' })
  date: Date;

  @ApiProperty({ example: 20 })
  pointsEarned: number;

  constructor(partial: Partial<ITransaction>) {
    Object.assign(this, partial);
  }
}
