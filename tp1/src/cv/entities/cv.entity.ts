import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Cv {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  firstName: string;
  @Column()
  age: number;
  @Column()
  CIN: string;
  @Column()
  job: string;
  @Column()
  path: string;
}
