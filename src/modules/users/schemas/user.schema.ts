import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from '../../../common/schemas/base.schema';

export type UserDocument = BaseDocument & User;

@Schema({
  timestamps: true,
  collection: 'users',
  versionKey: false,
})
export class User {
  static name = 'User';

  // Campos básicos de autenticación
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  // Campos RPG - Iniciales (se establecen al registrarse)
  @Prop({ default: 1 })
  level: number;

  @Prop({ default: 100 })
  maxHealth: number;

  @Prop({ default: 100 })
  health: number;

  @Prop({ default: 10 })
  attack: number;

  @Prop({ default: 5 })
  defense: number;

  // Campos RPG - Progresivos (se van actualizando con el uso)
  @Prop({ default: 0 })
  experience: number;

  @Prop({ default: 100 }) // Experiencia necesaria para el siguiente nivel
  maxExperience: number;

  @Prop({ default: 0 })
  coins: number;

  @Prop({ default: 0 })
  streak: number;

  // Campos de control
  @Prop({ default: Date.now })
  lastLoginDate: Date;

  @Prop({ default: Date.now })
  lastActivityDate: Date;

  @Prop({ default: [] })
  achievements: string[];

  // Estadísticas de juego
  @Prop({ default: 0 })
  transactionsRegistered: number;

  @Prop({ default: 0 })
  challengesCompleted: number;

  @Prop({ default: 0 })
  totalCoinsEarned: number;
}

export const UserSchema = SchemaFactory.createForClass(User);