import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from '../../../common/schemas/base.schema';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export type UserDocument = BaseDocument & User;

@Schema({
  timestamps: true,
  collection: 'users',
  versionKey: false,
})
export class User {
  static name = 'User';
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 0 })
  points: number;

  @Prop({ default: 0 })
  diamonds: number;

  @Prop({ default: 0 })
  streak: number;

  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ default: Date.now })
  lastLoginDate: Date;

  @Prop({ default: Date.now })
  lastActivityDate: Date;

  @Prop({ default: [] })
  achievements: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);