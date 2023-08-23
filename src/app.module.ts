import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './test/test.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'test.db',
    entities: [Test],
    synchronize: true, //development only
  }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
