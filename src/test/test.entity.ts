import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  property_1: string;
 
  @Column()
  property_2: string;
 
  @Column()
  property_3: string;
}