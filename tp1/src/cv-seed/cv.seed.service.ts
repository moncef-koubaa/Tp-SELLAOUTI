import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  randFilePath,
  randFirstName,
  randJobTitle,
  randLastName,
  randNumber,
} from '@ngneat/falso';
import { Cv } from 'src/cv/entities/cv.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CvSeederService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
  ) {}
  async onApplicationBootstrap() {
      await this.seed();
    }
  }
  async seed() {
    const numberOfCvs = 10;
    const fakeCvs = Array.from({ length: numberOfCvs }).map(() => ({
      name: randLastName(),
      firstName: randFirstName(),
      age: randNumber({ min: 18, max: 60 }),
      job: randJobTitle(),
      path: randFilePath(),
      CIN: `${randNumber({ min: 1000000, max: 9999999 })}`,
      userId: randNumber({ min: 1, max: 10 }),
      skills: [randNumber({ min: 1, max: 10 })],
    }));
    await this.cvRepository.create(fakeCvs);
    console.log(`Seeded ${numberOfCvs} CVs`);
    console.log(fakeCvs);
  }
}
