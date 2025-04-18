import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Cv } from './entities/cv.entity';
import { Skill } from 'src/skill/entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cv, Skill])],
  controllers: [CvController],
  providers: [CvService],
})
export class CvModule {}
