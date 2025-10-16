import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IUser } from '../interfaces/user.interface';

@Exclude()
export class UserResponseDto {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty({ example: 'player123' })
  username: string;

  @Expose()
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @Expose()
  @ApiProperty({ example: 1 })
  level: number;

  @Expose()
  @ApiProperty({ example: 100 })
  health: number;

  @Expose()
  @ApiProperty({ example: 100 })
  maxHealth: number;

  @Expose()
  @ApiProperty({ example: 50 })
  experience: number;

  @Expose()
  @ApiProperty({ example: 100 })
  maxExperience: number;

  @Expose()
  @ApiProperty({ example: 10 })
  attack: number;

  @Expose()
  @ApiProperty({ example: 5 })
  defense: number;

  @Expose()
  @ApiProperty({ example: 100 })
  coins: number;

  @Expose()
  @ApiProperty({ example: 3 })
  streak: number;

  @Expose()
  @ApiProperty({ example: ['first_transaction', 'week_streak'] })
  achievements: string[];

  @Expose()
  @ApiProperty({ example: 10 })
  transactionsRegistered: number;

  @Expose()
  @ApiProperty({ example: 5 })
  challengesCompleted: number;

  @Expose()
  @ApiProperty({ example: 1000 })
  totalCoinsEarned: number;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<IUser>) {
    Object.assign(this, partial);
  }
}
