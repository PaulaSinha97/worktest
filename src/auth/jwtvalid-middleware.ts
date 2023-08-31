import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtValidMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
  ) {}


   async use(req: Request, res: Response, next: NextFunction) {
    try{
    const cookie= req.cookies['jwt'];
    const data=  await this.jwtService.verifyAsync(cookie);
    if(!data){
      throw new UnauthorizedException();
    }
    console.log("dddddddddd",data)
    res.locals.user = data['name'];
    next();
    }
    catch(e){
      throw new UnauthorizedException();
    }
  }
}
