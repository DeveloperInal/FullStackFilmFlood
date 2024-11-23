// JwtController
import { Controller, Get, Req, Res, HttpStatus } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { Response, Request } from 'express';

@Controller('jwt')
export class JwtController {
  constructor(private readonly jwt: JwtService) {}

  @Get('refresh')
  refreshToken(
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
    const token = req.cookies['refreshToken']
    const tokenData = this.jwt.refreshToken(token)
    res.cookie('refreshToken', tokenData, {
      httpOnly: true, 
      maxAge: 1_209_600_000, 
    });
    return res.status(HttpStatus.CREATED).json({ tokenData });
    } catch(error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Ошибка при пересоздании токена!', error });
    }
  }
}
