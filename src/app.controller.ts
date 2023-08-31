import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Response,
  Res,
} from '@nestjs/common';
// import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TestService } from './test/test.service';

@Controller()
export class AppController {
  constructor(
    private readonly authServiceAnyName: AuthService,
    private testService: TestService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req, @Res() resp) {
     return this.authServiceAnyName.login(req.user); // Will return JWT access token;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/protected')
  async getHello(@Request() req): Promise<any> {
    // require an Bearer token, validate token
    const user = await this.testService.findOne(req.user.name);
    // return req.user;
    console.log('>>>>>>>', user, req.user);
    return user;
  }


  // Middleware
  @Post('/loginwithmiddleware')
  async loginWithMiddleware(@Request() req){
   return 'successly set jwt in cookie';
  }

  @Get('/protectedWithMiddleware')
  async protected(@Request() req, @Response() res): Promise<any> {
    console.log('>>>>>>> middlewaRE', res.locals);
    const user = await this.testService.findOne(res.locals.user.name);
  
   res.send(user)
  }
}
