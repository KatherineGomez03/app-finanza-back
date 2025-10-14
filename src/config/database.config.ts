import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  uri: process.env.MONGODB_URI || 'mongodb://localhost/finance_db',
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 27017,
  name: process.env.DATABASE_NAME || 'finance_db',
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
}));