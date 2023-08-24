import { Body,Controller, Get, Post } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('/auth')
export class TestController {
  constructor(private  testService: TestService) {}

  @Get()
  getHello(): string {
    return "hiiiiiiiiiiiiiiiiii"
  }

  @Post('/signup')
  createUser(@Body() body: CreateUserDto){
    console.log("bodyyy",body);
    this.testService.create(body.email,body.password)
  }
}
