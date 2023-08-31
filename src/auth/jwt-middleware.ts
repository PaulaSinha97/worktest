import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class JwtCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('In middle ware', req.headers);
    next();
  }
}
