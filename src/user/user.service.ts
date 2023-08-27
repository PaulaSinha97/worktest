import { Injectable } from '@nestjs/common';
import { TestService } from 'src/test/test.service';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};
@Injectable()
export class UserService {
  // private readonly users: User[] = [
  //   { id: 1, name: 'Paula', username: 'paula', password: '123' },
  //   { id: 2, name: 'Lopa', username: 'lopa', password: '1234' },
  // ];

  constructor(private testService: TestService) {}

  async findOne(username: string) {
    console.log('PPPPPPPP', username);
    const user = await this.testService.findOne(username);
    return user;
  }
}
