import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller()
export class TestController {
  constructor(private readonly testServic: TestService) {}

  @Get()
  getHello(): string {
    return "hiiiiiiiiiiiiiiiiii"
  }
}
