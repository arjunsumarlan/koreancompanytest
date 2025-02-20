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

  // Enable CORS for all origins
  app.enableCors({
    origin: '*', // Allow all origins
    methods: '*', // Allow all methods
    allowedHeaders: '*', // Allow all headers
    exposedHeaders: '*', // Expose all headers
    credentials: false, // Must be false when using '*'
    maxAge: 86400, // Cache preflight requests for 24 hours
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
