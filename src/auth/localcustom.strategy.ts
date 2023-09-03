import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // only if username ya passowrd k node names galat it catches here
  // here it extends so PassportStrategy chalta he with correct node.
  constructor(private readonly authservice: AuthService) {
    // super(); // to add config for strategy here is here we add
    // super({ name: 'email', passReqToCallback: true })
    super({
      usernameField: 'name',
      password: 'password',
      passReqToCallback: true,
    });
  }

  // Gets params from BODY postman or FE(NOt true 1st param and 2nd param)
  // yaha pe ata he even if DB se diff username ya password dalo
  async validate(
    req,
    nameCanBeAnything: string,
    passwordCanBeANything: string,
    reqSentFromPostnam: any,
  ) {
    // not reaching here if we don't add passowrd node
    // will check 2 params for sure
    console.log(
      'validateeeeeeeeee',
      nameCanBeAnything,
      passwordCanBeANything,
      reqSentFromPostnam,
      req.headers,
    );
    const usercustom = await this.authservice.validateUser(
      nameCanBeAnything,
      passwordCanBeANything,
    );
    console.log('oooooo', usercustom);
    if (!usercustom) {
      console.log('yaha se unauh username ya passowrd dalne se error ata he');
      throw new UnauthorizedException();
    }
    //  done: (error: any, user?: Express.User | false, options?: IVerifyOptions) => void,
    // isilie user k andar a rha he object
    return usercustom;
  }
}

//https://stackoverflow.com/questions/68180035/nest-js-get-request-header-in-passport-local-strategy

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private authService: AuthService) {
//     super({ usernameField: 'email', passReqToCallback: true })
//   }

//   async validate(req: Request, email: string, password: string, headers:Headers): Promise<IUser> {
//     const subdomain = req.headers.host.split(".")[0];
//     const user = await this.authService.validateUser({ email, password ,//** subdomain})
//     if (!user) {
//       throw new UnauthorizedException()
//     }
//     return user
//   }
// }
