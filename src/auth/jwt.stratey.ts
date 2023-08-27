import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// when we need to use this in protected route
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // extract JWT from auth header
      // look in the header is the request and expects a bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'SECRET',
      ignoreExpiration: false,
    });
  }
  // payload is what we stores in the jwt token when we hit login
  validate(payload: any) {
    // here we can make call to DB and return that
    return {
      id: payload.sub,
      name: payload.name,
    };
  }
}
