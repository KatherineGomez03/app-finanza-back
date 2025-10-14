import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<IUser>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    // Verificar si el usuario ya existe
    const existingUser = await this.userModel.findOne({
      $or: [
        { email: createUserDto.email },
        { username: createUserDto.username },
      ],
    });

    if (existingUser) {
      throw new ConflictException(
        'User already exists with this email or username',
      );
    }

    // Hash de la contraseña
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    // Crear el nuevo usuario
    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    return user.save();
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find({ isDeleted: false }).exec();
  }

  async findOne(id: string): Promise<IUser> {
    const user = await this.userModel.findOne({ _id: id, isDeleted: false });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    console.log('Searching for user with email:', email);
    const user = await this.userModel.findOne({ email });
    console.log('Database search result:', {
      found: !!user,
      email: user?.email,
      id: user?._id?.toString()
    });
    return user;
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return this.userModel.findOne({ username, isDeleted: false });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const user = await this.userModel
      .findOneAndUpdate({ _id: id, isDeleted: false }, updateUserDto, {
        new: true,
      })
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateExperience(id: string, experienceGained: number): Promise<IUser> {
    const user = await this.findOne(id);
    user.experience += experienceGained;

    // Verificar si el usuario sube de nivel
    while (user.experience >= user.maxExperience) {
      user.level += 1;
      user.experience -= user.maxExperience;
      user.maxExperience = Math.floor(user.maxExperience * 1.5); // Incremento del 50% en exp requerida
      user.maxHealth += 10;
      user.health = user.maxHealth;
      user.attack += 2;
      user.defense += 1;
    }

    return user.save();
  }

  async updateStreak(id: string): Promise<IUser> {
    const user = await this.findOne(id);
    const now = new Date();
    const lastActivity = new Date(user.lastActivityDate);

    // Verificar si es un nuevo día (más de 24 horas desde la última actividad)
    if (now.getTime() - lastActivity.getTime() > 24 * 60 * 60 * 1000) {
      user.streak += 1;
      // Bonus por racha
      const streakBonus = Math.floor(user.streak / 7) * 5; // 5 monedas extra por cada semana de racha
      user.coins += streakBonus;
    }

    user.lastActivityDate = now;
    return user.save();
  }

  async softDelete(id: string): Promise<void> {
    const result = await this.userModel.updateOne(
      { _id: id, isDeleted: false },
      { isDeleted: true },
    );

    if (result.modifiedCount === 0) {
      throw new NotFoundException('User not found');
    }
  }

  async addAchievement(id: string, achievement: string): Promise<IUser> {
    const user = await this.findOne(id);
    if (!user.achievements.includes(achievement)) {
      user.achievements.push(achievement);
      return user.save();
    }
    return user;
  }
}