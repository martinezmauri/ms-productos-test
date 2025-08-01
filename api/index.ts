import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

let app;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule);

    // Configuración de Swagger
    const config = new DocumentBuilder()
      .setTitle('API para microservicios de POWIP-Products')
      .setDescription(
        'Documentación de la API microservicios de POWIP-Products',
      )
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);

    // Configurar Swagger UI con opciones más compatibles con Vercel
    SwaggerModule.setup('api', app, document, {
      customSiteTitle: 'POWIP Products API',
      customCss: '.swagger-ui .topbar { display: none }',
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
      },
    });

    // Endpoint adicional para obtener la documentación en JSON
    app.use('/api-json', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(document);
    });

    // Configuración de CORS para Vercel
    app.enableCors({
      origin: ['http://localhost:3000', 'https://ms-productos.vercel.app', '*'],
      credentials: true,
    });

    await app.init();
  }
  return app;
}

export default async function handler(req, res) {
  const app = await bootstrap();
  const expressApp = app.getHttpAdapter().getInstance();
  return expressApp(req, res);
}
