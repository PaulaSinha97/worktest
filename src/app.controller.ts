import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
// import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authServiceAnyName: AuthService) {}
  //gjh
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req) {
    return this.authServiceAnyName.login(req.user); // Will return JWT access token
  }

  @UseGuards(JwtAuthGuard)
  @Get('/protected')
  getHello(@Request() req): string {
    // require an Bearer token, validate token
    return req.user;
  }
}
