import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from './test.entity';


 
@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private repo: Repository<Test>
  ) {
    }
    create(email:string,password:string){
      const user= this.repo.create({email,password});
      console.log("usee",user);
      
      return this.repo.save(user)
  }


  // find(email:string){
  //   return this.repo.findOne(email)
  // }
}