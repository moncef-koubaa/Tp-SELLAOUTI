import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';

import {
  randFilePath,
  randFirstName,
  randJobTitle,
  randLastName,
  randNumber,
} from '@ngneat/falso';
import { CvService } from 'src/cv/cv.service';

@Injectable()
export class CvSeederService implements OnApplicationBootstrap {
  constructor(
    @Inject()
    private readonly cvService: CvService,
  ) {}
  async onApplicationBootstrap() {
    if ((await this.cvService.findAll()).length === 0) {
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
    }));
    await this.cvService.create(fakeCvs);
    console.log(`Seeded ${numberOfCvs} CVs`);
    console.log(fakeCvs);
  }
}
