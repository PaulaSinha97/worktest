import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TestModule } from 'src/test/test.module';

@Module({
  imports: [TestModule],
  providers: [UserService],
  //alow service from one module to be used in other
  exports: [UserService],
})
export class UserModule {}
