import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as openapi from '../config/openapi.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .addApiKey({ type: 'apiKey', name: 'HTTP-X-API-KEY', in: 'header', description: 'Llave de servicio' })
    .setTitle(openapi.title)
    .setDescription(openapi.description)
    .setVersion(openapi.version)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document);

  await app.listen((parseInt(process.env.PORT, 10) || 3000));
}
bootstrap();
