import { Controller, Post, Get, Body } from '@nestjs/common';
import { FilmResService } from './film_res.service';

@Controller('film-res')
export class FilmResController {
  constructor(private readonly filmResService: FilmResService) {}

  @Post('create-film')
  postFilm(@Body() body) {
    return this.filmResService.AddFilm(body);
  }

  @Get('get-film')
  getFilm() {
    return this.filmResService.GetFIlm();
  }
}
