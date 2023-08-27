import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  //alow service from one module to be used in other
  exports: [UserService],
})
export class UserModule {}
