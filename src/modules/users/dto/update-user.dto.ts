import { IsOptional, IsNumber, Min, Max, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @ApiProperty({ required: false, description: 'Current health points' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  health?: number;

  @ApiProperty({ required: false, description: 'Maximum health points' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxHealth?: number;

  @ApiProperty({ required: false, description: 'Current experience points' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  experience?: number;

  @ApiProperty({ required: false, description: 'Experience needed for next level' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxExperience?: number;

  @ApiProperty({ required: false, description: 'Current level' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  level?: number;

  @ApiProperty({ required: false, description: 'Attack power' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  attack?: number;

  @ApiProperty({ required: false, description: 'Defense power' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  defense?: number;

  @ApiProperty({ required: false, description: 'Game currency' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  coins?: number;

  @ApiProperty({ required: false, description: 'Daily login streak' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  streak?: number;

  @ApiProperty({ required: false, description: 'List of unlocked achievements' })
  @IsOptional()
  @IsString({ each: true })
  achievements?: string[];

  @ApiProperty({ required: false, description: 'Last activity timestamp' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  lastActivityDate?: Date;

  @ApiProperty({ required: false, description: 'Number of registered transactions' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  transactionsRegistered?: number;

  @ApiProperty({ required: false, description: 'Number of completed challenges' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  challengesCompleted?: number;

  @ApiProperty({ required: false, description: 'Total coins earned' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalCoinsEarned?: number;
}