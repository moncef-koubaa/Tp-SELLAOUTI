import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from '../cv/entities/cv.entity';
import { CvSeederService } from './cv.seed.service';
import { User } from '../user/entities/user.entity';
import { Skill } from '../skill/entities/skill.entity';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'admin',
    //   password: 'admin',
    //   database: 'tp',
    //   entities: [User, Cv, Skill],
    //   synchronize: true,
    //   autoLoadEntities: true,
    // }),
    TypeOrmModule.forFeature([User, Cv, Skill]),
  ],
  providers: [CvSeederService],
  exports: [CvSeederService],
})
export class CvSeederModule {
  constructor() {
    console.log('Database connection config:', {
      username: 'admin',
      password: 'admin',
      database: 'tp',
    });
  }
}
