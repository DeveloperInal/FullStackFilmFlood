import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FilmResService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  AddFilm(body: { filmdata: { description: string, releases_data: string, logo_url: string, countries_name: string, film_name: string } }) {
      const { filmdata } = body;
      const { description, releases_data, countries_name, film_name } = filmdata;
    
      return this.prisma.kinoTable.create({
        data: {
          filmdata: {
            description: description,          
            releases_data: releases_data,                      
            countries_name: countries_name,    
            film_name: film_name               
          }
        }
      });
    }
    
  GetFIlm() {
      return this.prisma.kinoTable.findMany()
  }
}
