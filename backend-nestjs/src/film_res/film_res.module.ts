import { Module } from '@nestjs/common';
import { FilmResService } from './film_res.service';
import { FilmResController } from './film_res.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FilmResController],
  providers: [FilmResService, PrismaService],
})
export class FilmResModule {}
