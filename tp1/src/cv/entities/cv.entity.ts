import { Skill } from 'src/skill/entities/skill.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
  @ManyToOne(() => User, (user) => user.cvs)
  user: User;
  @ManyToMany(() => Skill, (skill) => skill.cvs)
  skills: Skill[];
}
