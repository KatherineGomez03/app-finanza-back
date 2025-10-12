import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseDocument } from '../../../common/schemas/base.schema';

export type RewardDocument = BaseDocument & Reward;

export enum RewardType {
  BADGE = 'badge',
  THEME = 'theme',
  FEATURE = 'feature',
  BONUS = 'bonus',
}

@Schema({
  timestamps: true,
  collection: 'rewards',
})
export class Reward {
  static name = 'Reward';
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: String, enum: RewardType, required: true })
  type: RewardType;

  @Prop({ required: true })
  cost: number;

  @Prop()
  imageUrl: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], autopopulate: true })
  unlockedBy: Types.ObjectId[];

  @Prop({ required: true })
  conditions: object;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop()
  expirationDate: Date;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);