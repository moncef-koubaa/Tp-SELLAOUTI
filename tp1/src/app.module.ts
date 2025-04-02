import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CvModule } from './cv/cv.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [CvModule, ImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
