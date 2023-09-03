import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './localcustom.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.stratey';
import { JwtCheckMiddleware } from './jwt-middleware';
import { JwtValidMiddleware } from './jwtvalid-middleware';

@Module({
  // using userservice in local strategy by importing usermodule
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtCheckMiddleware,
    JwtValidMiddleware,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
