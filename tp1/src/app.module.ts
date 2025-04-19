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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes variables available everywhere
      envFilePath: '.env', // Explicit path (optional)
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin', // Changed to match Docker config
      password: 'admin', // Changed to match Docker config
      database: 'tp', // Changed to match Docker config
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
