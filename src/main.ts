import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  try {
    logger.log('Starting application...');
    const app = await NestFactory.create(AppModule);
    
    logger.log('Enabling CORS...');
    app.enableCors();
    
    logger.log('Configuring validation pipe...');
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }));

    const port = process.env.PORT ?? 3000;
    logger.log(`Starting server on port ${port}...`);
    await app.listen(port, '0.0.0.0'); // <-- Importante: escuchar en todas las interfaces
    logger.log(`🚀 Application is running on: http://localhost:${port}`);
  } catch (error) {
    logger.error('Error starting application:', error);
    throw error;
  }
}

bootstrap().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
