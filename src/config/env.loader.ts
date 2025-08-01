import { config as dotenvConfig } from 'dotenv';

// Carga el archivo .env o .env.development según el entorno
if (process.env.NODE_ENV !== 'production') {
  dotenvConfig({ path: '.env.development' });
} else {
  dotenvConfig(); // Por defecto lee .env
}

export const DB_NAME = process.env.DB_NAME;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = parseInt(process.env.DB_PORT || '5432');
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
