import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
