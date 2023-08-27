import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from './test.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private repo: Repository<Test>,
  ) {}
  async create(
    username: string,
    name: string,
    email: string,
    password: string,
  ) {
    const user = await this.repo.create({ username, name, email, password });
    console.log('usee', user);

    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find(); // Select * from user
  }

  findOne(username: string) {
    console.log('query for find', username);
    return this.repo.findOneBy({ name: username });
  }

  async update(username: string) {
    const user = await this.findOne(username);
    return this.repo.save(user);
  }

  async remove(username: string) {
    const deletedUser = await this.findOne(username);

    return this.repo.remove(deletedUser);
  }
}
