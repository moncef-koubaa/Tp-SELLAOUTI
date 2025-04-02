import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

@Injectable()
export class CvService {
  async create(createCvDto: CreateCvDto) {
    return 'This action adds a new cv';
  }

  async findAll() {
    return `This action returns all cv`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} cv`;
  }

  async update(id: number, updateCvDto: UpdateCvDto) {
    return `This action updates a #${id} cv`;
  }

  async remove(id: number) {
    return `This action removes a #${id} cv`;
  }
}
