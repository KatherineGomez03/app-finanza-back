import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    console.log('=== LOGIN ATTEMPT START ===');
    console.log('1. AuthService received:', {
      email: loginDto?.email,
      passwordPresent: !!loginDto?.password,
      loginDtoType: typeof loginDto
    });

    // Validación básica
    if (!loginDto?.email || !loginDto?.password) {
      console.log('Missing email or password');
      throw new UnauthorizedException('Email and password are required');
    }

    console.log('2. Looking up user in database...');
    // Buscar usuario
    const user = await this.usersService.findByEmail(loginDto.email);
    console.log('3. Database lookup result:', {
      emailUsed: loginDto.email,
      userFound: !!user,
      userEmail: user?.email,
      userId: user?._id?.toString()
    });

    if (!user) {
      console.log('Login failed: User not found');
      throw new UnauthorizedException('Invalid credentials');
    }

    // Validar contraseña
    console.log('4. Attempting password validation:', {
      providedPasswordLength: loginDto.password.length,
      storedHashLength: user.password.length,
      passwordStartsWith: loginDto.password.substring(0, 3) + '...',
      hashStartsWith: user.password.substring(0, 10) + '...'
    });
    
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    console.log('5. Password validation complete:', {
      isValid: isPasswordValid,
      bcryptCompareResult: isPasswordValid
    });
    console.log('=== LOGIN ATTEMPT END ===');

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: user._id.toString(),
      email: user.email,
    };

    // Convertir a objeto plano y eliminar la contraseña
    const userWithoutPassword = user.toJSON();
    delete userWithoutPassword.password;

    return {
      access_token: this.jwtService.sign(payload),
      user: userWithoutPassword,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const payload: JwtPayload = {
      sub: user._id.toString(),
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}