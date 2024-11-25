import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { FilmResModule } from './film_res/film_res.module';
import { FilmResController } from './film_res/film_res.controller';
import { FilmResService } from './film_res/film_res.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from './auth/jwt/jwt.service';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { EmailModule } from './auth/email/email.module';
import { RedisService } from './redis.service';
import { EmailService } from './auth/email/email.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), FilmResModule, AuthModule, EmailModule],
  controllers: [FilmResController],
  providers: [PrismaService, FilmResService, AuthService, NestJwtService, EmailService, JwtService, RedisService],
})
export class AppModule {}
