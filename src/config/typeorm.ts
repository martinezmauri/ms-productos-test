import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from './env.loader';

const config = {
  type: 'postgres',
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  autoLoadEntities: true,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../migrations/*.{js,ts}'],
  synchronize: true,
  //synchronize: false,
  //dropSchema: true,
  logging: true,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
  //logger: 'advanced-console',
  //logNotifications: true,
  //dropSchema: true,
};

// Log de configuración (sin mostrar contraseña)
console.log('🔧 Configuración de base de datos:');
console.log('Host:', DB_HOST);
console.log('Port:', DB_PORT);
console.log('Database:', DB_NAME);
console.log('Username:', DB_USERNAME);
console.log(
  'SSL:',
  process.env.NODE_ENV === 'production' ? 'Enabled' : 'Disabled',
);

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions); //migraciones desde cli
