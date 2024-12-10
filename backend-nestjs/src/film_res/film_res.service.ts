import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FilmResService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  AddFilm(body: { film_name: string, alternative_film_name: string, description: 
    string, actors: { name: string, alternative_name: string, 
      role: string, was_born: string, height: number } }) {
      const { film_name, alternative_film_name, description, actors: { name, alternative_name, role, was_born, height } } = body;
    
      return this.prisma.kinoTable.create({
        data: {
          film_name,
          alternative_film_name,
          description,
          actors: {
            create: [
              {
                name: name, 
                alternative_name: alternative_name, 
                role: role, 
                was_born: was_born, 
                height: height, 
              },
            ],
          },
        },
      });
    }
    
  GetFIlm() {
      return this.prisma.kinoTable.findMany()
  }
}
