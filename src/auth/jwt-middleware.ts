import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtCheckMiddleware implements NestMiddleware {
  constructor(private auth: AuthService) {}

  // use(req: Request, res: Response, next: NextFunction) {
  //   console.log('In middle ware', req.user);
  //      const payload = { name: "req.user?.name", sub:" req.user?.id "};
  //   // console.log('innnnnnnnnnnnnnnnn');
  //   // this.jwtService.sign(payload);
  //    res.cookie('jwt', this.jwtService.sign(payload), { httpOnly: true });
  //   // res.cookie('jwt', jwt, { httpOnly: true });
  //   next();
  // }

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('In middle ware', req.body);
    const token = await this.auth.login({
      name: req.body.name,
      id: req.body.password,
    });
    // httpOnly means FE won't be able to access JWT cookie
    // BE will use the JWT
    //  { httpOnly: true }
    res.cookie('jwt', token.access_token);
    next();
  }
}
