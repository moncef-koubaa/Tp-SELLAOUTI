import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from '../cv/entities/cv.entity';
import { CvSeederService } from './cv.seed.service';
import { User } from '../user/entities/user.entity';
import { Skill } from '../skill/entities/skill.entity';

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
    TypeOrmModule.forFeature([User, Cv, Skill]),
  ],
  providers: [CvSeederService],
  exports: [CvSeederService],
})
export class CvSeederModule {}
