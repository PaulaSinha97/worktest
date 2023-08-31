import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './test/test.entity';
import { TestModule } from './test/test.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtCheckMiddleware } from './auth/jwt-middleware';
import { JwtValidMiddleware } from './auth/jwtvalid-middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'test.db',
      entities: [Test],
      synchronize: true, //development only
    }),
    // JwtModule.register({
    //   secret: 'SECRET',
    //   signOptions: { expiresIn: '1d' },
    // }),
    TestModule,
    // Imported on it's own
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtCheckMiddleware).forRoutes({
      path: '/loginwithmiddleware',
      method: RequestMethod.POST,
    });
    consumer.apply(JwtValidMiddleware).forRoutes({
      path: '/protectedWithMiddleware',
      method: RequestMethod.GET,
    });
  }
}
