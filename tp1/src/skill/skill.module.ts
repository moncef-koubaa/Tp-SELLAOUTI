import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from 'src/cv/entities/cv.entity';
import { Skill } from './entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Skill, Cv])],
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule {}
