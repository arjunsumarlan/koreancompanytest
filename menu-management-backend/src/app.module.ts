import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MenuModule } from './menu/menu.module';
import { PrismaModule } from '../prisma/prisma.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    MenuModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
