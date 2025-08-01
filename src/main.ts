import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Documentacion API POWIP')
    .setDescription('Documentacion POWIP Microservicio Productos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);
  const port = process.env.PORT ?? 3000;

  app.enableCors({
    origin: ['http://localhost:3000', 'https://ms-productos.vercel.app'],
    credentials: true,
  });

  await app.listen(port);

  console.log(`🚀 App listening on port ${port}`);
}
bootstrap();
