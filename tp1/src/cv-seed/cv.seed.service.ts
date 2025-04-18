import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  randUserName,
  randEmail,
  randPassword,
  randNumber,
  randFirstName,
  randJobTitle,
  randSkill,
  randAlphaNumeric,
} from '@ngneat/falso';
import * as bcrypt from 'bcrypt';
import { Cv } from '../cv/entities/cv.entity';
import { User } from '../user/entities/user.entity';
import { Skill } from '../skill/entities/skill.entity';

@Injectable()
export class CvSeederService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async onApplicationBootstrap() {
    await this.seed();
  }

  private async seed(): Promise<void> {
    const users = await this.seedUsers(5);
    const skills = await this.seedSkills(10);
    await this.seedCvs(15, users, skills);
    console.log('Database seeding completed!');
  }

  private async seedUsers(count: number): Promise<User[]> {
    const users = await Promise.all(
      Array.from({ length: count }, async () => ({
        username: randUserName(),
        email: randEmail(),
        password: await bcrypt.hash(randPassword(), 10),
      })),
    );

    return this.userRepository.save(users);
  }

  private async seedSkills(count: number): Promise<Skill[]> {
    const skills = Array.from({ length: count }, () => ({
      Designation: randSkill(),
    }));

    return this.skillRepository.save(skills);
  }

  private async seedCvs(
    count: number,
    users: User[],
    skills: Skill[],
  ): Promise<void> {
    const cvPromises = Array.from({ length: count }, async () => {
      const cv = this.cvRepository.create({
        name: randJobTitle(),
        firstName: randFirstName(),
        age: randNumber({ min: 20, max: 60 }),
        CIN: randNumber({ min: 10000000, max: 99999999 }),
        job: randJobTitle(),
        path: `/cvs/${randAlphaNumeric({ length: 10 })}.pdf`,
        user: users[randNumber({ min: 0, max: users.length - 1 })],
        skills: this.getRandomSkills(skills),
      });

      return this.cvRepository.save(cv);
    });

    await Promise.all(cvPromises);
  }

  private getRandomSkills(skills: Skill[], max = 5): Skill[] {
    const count = randNumber({ min: 1, max });
    const selected = new Set<Skill>();

    while (selected.size < count) {
      selected.add(skills[randNumber({ min: 0, max: skills.length - 1 })]);
    }

    return Array.from(selected);
  }
}
