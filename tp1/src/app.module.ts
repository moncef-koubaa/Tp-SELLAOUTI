import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CvModule } from './cv/cv.module';
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [CvModule, UserModule, SkillModule, ImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
