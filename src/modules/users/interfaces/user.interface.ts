import { Document, Types } from 'mongoose';
import { User } from '../schemas/user.schema';

export interface IUser extends Omit<User, keyof Document>, Document {
  _id: Types.ObjectId;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export type CreateUserParams = Omit<User, 'comparePassword'>;
export type UpdateUserParams = Partial<CreateUserParams>;