import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};
@Injectable()
export class UserService {
  private readonly users: User[] = [
    { id: 1, name: 'Paula', username: 'paula', password: '123' },
    { id: 2, name: 'Lopa', username: 'lopa', password: '1234' },
  ];

  findOne(username: string) {
    console.log('PPPPPPPP', username);
    return this.users.find((user) => user.username === username);
  }
}
