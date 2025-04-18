import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CvModule } from './cv/cv.module';
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Cv } from './cv/entities/cv.entity';
import { Skill } from './skill/entities/skill.entity';
import { ImageModule } from './image/image.module';

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
    CvModule,
    UserModule,
    SkillModule,

    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
