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
}