import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authservice: AuthService) {
    super(); // to add config for strategy here is here we add
  }

  // Gets params from BODY postman or FE
  validate(username: string, password: string) {
    const user = this.authservice.validateUser(username, password);
    if (!user) {
      console.log('innnnnnnnnnnn');
      throw new UnauthorizedException();
    }
    return user;
  }
}
