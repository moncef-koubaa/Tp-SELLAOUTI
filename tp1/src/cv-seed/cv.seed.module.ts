import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from '../cv/entities/cv.entity';
import { CvSeederService } from './cv.seed.service';
import { User } from 'src/user/entities/user.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import { CvModule } from 'src/cv/cv.module';
import { UserModule } from 'src/user/user.module';
import { SkillModule } from 'src/skill/skill.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'your_password',
      database: process.env.DB_NAME || 'your_database_name',
      entities: [User, Cv, Skill],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  providers: [CvSeederService],
  exports: [CvSeederService],
})
export class CvSeederModule {}
