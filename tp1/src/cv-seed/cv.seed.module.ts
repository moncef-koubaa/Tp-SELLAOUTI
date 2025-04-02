import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from '../cv/entities/cv.entity';
import { CvSeederService } from './cv.seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cv])],
  providers: [CvSeederService],
  exports: [CvSeederService],
})
export class CvSeederModule {}
