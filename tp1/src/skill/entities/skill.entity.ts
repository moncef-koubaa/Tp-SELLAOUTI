import { Cv } from '../../cv/entities/cv.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  Designation: string;
  @ManyToMany(() => Cv, (cv) => cv.skills)
  cvs: Cv[];
}
