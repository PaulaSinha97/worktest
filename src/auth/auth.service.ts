import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // self create services
  async validateUser(name: string, passwordcus: string) {
    const user = await this.userService.findOne(name);
    console.log('validate user service', user, passwordcus);
    if (user && user.password === passwordcus) {
      console.log('::success');
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  login(user: any) {
    try {
      // Info that we want to save in that JWT
      const payload = { name: user.name, sub: user.id };
      // when we register JWT we give a secret and same is used while wes sign
      // Hence in JWT strategy we need the same secret for authorization
      console.log('login user', user.name);
      // res.cookie('jwt', this.jwtService.sign(payload), { httpOnly: true });
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
