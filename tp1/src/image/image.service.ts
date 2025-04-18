import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import {Injectable, UseInterceptors} from '@nestjs/common';
import { ensureDir, writeFile } from 'fs-extra';
import { join } from 'path';
import {diskStorage} from "multer";
import {FileInterceptor} from "@nestjs/platform-express";
@Injectable()
export class ImageService {
  private readonly uploadDir = './uploads';
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads', // folder to save images
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const originalName = file.originalname.replace(/\s+/g, '_');
          cb(null, `${uniqueSuffix}-${originalName}`);
        },
      }),
    }),
  )
  async uploadImage(file: Express.Multer.File): Promise<{ path: string }> {
    await ensureDir(this.uploadDir);

    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = join(this.uploadDir, fileName);

    // Check if buffer exists, otherwise use the file stream
    const fileData = file.buffer || (await this.streamToBuffer(file.stream));

    await writeFile(filePath, fileData);

    return { path: filePath };
  }

  private async streamToBuffer(stream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks = [];
      // @ts-expect-error
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }

  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  findAll() {
    return `This action returns all image`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
