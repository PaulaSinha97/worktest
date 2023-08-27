import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // self create services
  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);

    if (user && user.password === password) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  login(user: any) {
    // Info that we want to save in that JWT
    const payload = { name: user.name, sub: user.id };
    // when we register JWT we give a secret and same is used while wes sign
    // Hence in JWT strategy we need the same secret for authorization
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
