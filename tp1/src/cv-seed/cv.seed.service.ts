import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cv } from '../cv/entities/cv.entity';

@Injectable()
export class CvSeederService {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
  ) {}

  async seed(): Promise<void> {
    // TODO: Implement CV seeding logic
    console.log('Seeding CV data...');
  }
}
