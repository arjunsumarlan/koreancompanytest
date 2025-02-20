import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  // Log environment variables
  console.log('Environment variables:');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
  console.log('PORT:', process.env.PORT);

  const app = await NestFactory.create(AppModule);

  // CORS configuration
  app.enableCors({
    origin: [
      '*',
      'http://localhost:3000',
      'http://localhost:3001',
      'https://my-first-project-ecfed.web.app',
      'https://my-first-project-ecfed.firebaseapp.com',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Enable validation pipes
  app.useGlobalPipes(new ValidationPipe());

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Menu Management API')
    .setDescription('Menu Management System API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Use explicit port 3002 if not set
  const port = process.env.PORT || 3002;
  await app.listen(port, '0.0.0.0');

  console.log(`Application is running on port ${port}`);
}

bootstrap();
