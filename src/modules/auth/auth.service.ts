import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
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
    const logger = new Logger('AuthService');
    logger.log('\n🔑 ==== PASSWORD VALIDATION DEBUG ==== 🔑');
    logger.log(`📧 Email: ${email}`);

    // 1. Buscar usuario
    logger.log('🔍 Iniciando búsqueda de usuario...');
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      logger.log('❌ Usuario no encontrado en la base de datos');
      logger.log('Email buscado:', email);
      return null;
    }
    
    logger.log('Comparando emails:');
    logger.log('Email buscado :', email);
    logger.log('Email en DB   :', user.email);

    logger.log('✅ Usuario encontrado en la base de datos');
    logger.log('📝 Datos del usuario encontrado:');
    logger.log(JSON.stringify({
      id: user._id,
      email: user.email,
      username: user.username,
      storedHash: user.password,
    }, null, 2));

    // 2. Generar un nuevo hash de la contraseña proporcionada para comparar
    try {
      // Primero vamos a hacer un hash de prueba para ver cómo se ve
      const salt = await bcrypt.genSalt(10);
      const testHash = await bcrypt.hash(password, salt);
      logger.log('\n🔐 DEBUG DE HASHES:');
      logger.log(`Contraseña proporcionada: ${password}`);
      logger.log(`Hash almacenado     : ${user.password}`);
      logger.log(`Hash de prueba      : ${testHash}`);

      // Validaciones adicionales antes de la comparación
      logger.log('\n🔍 Validaciones previas:');
      logger.log(`Longitud de contraseña: ${password.length}`);
      logger.log(`Longitud de hash almacenado: ${user.password.length}`);
      
      // Ahora hacemos la comparación real
      logger.log('\n🔍 Comparando contraseñas...');
      const isMatch = await bcrypt.compare(password, user.password);
      logger.log(`📊 Resultado de la comparación: ${isMatch ? '✅ COINCIDE' : '❌ NO COINCIDE'}`);
      
      // Debug adicional si no hay coincidencia
      if (!isMatch) {
        logger.log('🔍 Información de depuración adicional:');
        logger.log('Caracteres iniciales del hash almacenado:', user.password.substring(0, 10));
        logger.log('Hash almacenado es válido:', user.password.startsWith('$2b$') || user.password.startsWith('$2a$'));
      }

      if (isMatch) {
        logger.log('🎉 Autenticación exitosa!');
        const userObject = user.toObject ? user.toObject() : user;
        const { password: _, ...result } = userObject;
        logger.log('🔄 Objeto de usuario a devolver:', JSON.stringify(result, null, 2));
        return result;
      } else {
        logger.log('❌ Las contraseñas no coinciden');
        logger.log('⚠️ Esto puede deberse a:');
        logger.log('1. La contraseña ingresada es incorrecta');
        logger.log('2. El hash almacenado está corrupto');
        logger.log('3. El proceso de hashing está usando diferentes configuraciones');
      }
    } catch (error) {
      logger.error('⚠️ Error durante la comparación:', error);
      logger.error('Detalles del error:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }

    return null;
  }

  async login(loginDto: LoginDto) {
    const logger = new Logger('AuthService');
    logger.log('==== Starting Login Process ====');
    logger.log(`Login attempt for email: ${loginDto.email}`);

    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      logger.log('❌ Login failed: validateUser returned null');
      throw new UnauthorizedException('Invalid credentials');
    }

    logger.log('✅ User validation successful');
    logger.log('📄 User object received:', JSON.stringify(user, null, 2));
    logger.log('Generating JWT token...');
    
    const payload: JwtPayload = {
      sub: user._id.toString(),
      email: user.email,
    };

    const access_token = this.jwtService.sign(payload);
    logger.log('✅ Token generated successfully');
    logger.log('🎟️ Token:', access_token);

    const response = {
      access_token,
      user,
    };
    
    logger.log('📤 Sending response:', JSON.stringify(response, null, 2));
    return response;
  }

  async register(createUserDto: CreateUserDto) {
    const logger = new Logger('AuthService');
    logger.log('\n📝 ==== REGISTRO DE USUARIO ==== 📝');
    logger.log('Datos de registro:', {
      email: createUserDto.email,
      password: createUserDto.password ? 'PRESENTE' : 'AUSENTE'
    });

    const user = await this.usersService.create(createUserDto);
    logger.log('✅ Usuario creado exitosamente');
    logger.log('📊 Hash de contraseña guardado:', user.password);

    const payload: JwtPayload = {
      sub: user._id.toString(),
      email: user.email,
    };

    const token = this.jwtService.sign(payload);
    logger.log('🎟️ Token JWT generado');

    return {
      access_token: token,
      user,
    };
  }
}