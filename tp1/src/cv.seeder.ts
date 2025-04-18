import { NestFactory } from '@nestjs/core';
import { CvSeederModule } from './cv-seed/cv.seed.module';
import { CvSeederService } from './cv-seed/cv.seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(CvSeederModule);
  const cvSeeder = app.get(CvSeederService);
  await cvSeeder.onApplicationBootstrap();

  await app.close();
}

bootstrap();
