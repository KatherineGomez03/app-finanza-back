import { Injectable, ConflictException, NotFoundException, Logger } from '@nestjs/common';
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
    const logger = new Logger('UsersService');
    logger.log('==== Starting User Creation ====');
    
    // verifica si el usuario ya existe
    const existingUser = await this.userModel.findOne({
      $or: [
        { email: createUserDto.email },
        { username: createUserDto.username },
      ],
    });

    if (existingUser) {
      logger.log('❌ User already exists');
      throw new ConflictException(
        'User already exists with this email or username',
      );
    }

    logger.log('✅ User does not exist, proceeding with creation');
    
    // Hash de la contraseña con configuración específica
    const salt = await bcrypt.genSalt(10); // Usando 10 rounds específicamente
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    
    logger.log('✅ Password hashed successfully');
    logger.log('Original password length:', createUserDto.password.length);
    logger.log('Hashed password length:', hashedPassword.length);

    // Crear el nuevo usuario
    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    logger.log('✅ User saved successfully');
    logger.log('Saved password hash:', savedUser.password);
    
    return savedUser;
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<IUser> {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const logger = new Logger('UsersService');
    logger.log('\n🔍 ==== BÚSQUEDA DE USUARIO POR EMAIL ==== 🔍');
    logger.log('Email a buscar:', email);
    
    // Buscar el usuario por email
    const user = await this.userModel.findOne({ email: email }).exec();
    
    if (user) {
      logger.log('✅ Usuario encontrado');
      logger.log('Datos del usuario:', {
        id: user._id,
        email: user.email,
        username: user.username
      });

      // Debug adicional del documento
      logger.log('Documento completo:', JSON.stringify(user.toObject(), null, 2));
    } else {
      logger.log('❌ Usuario no encontrado');
      
      // Debug adicional
      const allUsers = await this.userModel.find({}, { email: 1 }).exec();
      logger.log('📋 Todos los usuarios en la base de datos:');
      allUsers.forEach(u => {
        logger.log(`- Email: ${u.email}`);
      });
    }
    
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