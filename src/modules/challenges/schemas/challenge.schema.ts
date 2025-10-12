import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseDocument } from '../../../common/schemas/base.schema';

export type ChallengeDocument = BaseDocument & Challenge;

export enum ChallengeType {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  SPECIAL = 'special',
}

export enum ChallengeStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  FAILED = 'failed',
  EXPIRED = 'expired',
}

@Schema({
  timestamps: true,
  collection: 'challenges',
})
export class Challenge {
  static name = 'Challenge';
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: String, enum: ChallengeType, required: true })
  type: ChallengeType;

  @Prop({ required: true })
  points: number;

  @Prop({ required: true })
  diamonds: number;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  conditions: object;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], autopopulate: true })
  participants: Types.ObjectId[];

  @Prop({ type: Map, of: String, default: new Map() })
  participantStatus: Map<string, ChallengeStatus>;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);