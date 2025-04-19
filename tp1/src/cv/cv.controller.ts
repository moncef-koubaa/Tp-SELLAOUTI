import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ForbiddenException } from '@nestjs/common';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}


  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Post()
  createV1(@Body() createCvDto: CreateCvDto, @Request() req) {
    return this.cvService.create({
      ...createCvDto,
      userId: req.user.userId, // Injection du userId depuis le token
    });
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get()
  findAllV1() {
    return this.cvService.findAll();
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOneV1(@Param('id') id: string, @Request() req) {
    return this.cvService.findOne(+id);
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateV1(
    @Param('id') id: string,
    @Body() updateCvDto: UpdateCvDto,
    @Request() req,
  ) {
    const cv = await this.cvService.findOne(+id);

    if (cv?.user.id !== req.user.userId) {
      throw new ForbiddenException(
        'Vous ne pouvez modifier que vos propres CV',
      );
    }

    return this.cvService.update(+id, updateCvDto);
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeV1(@Param('id') id: string, @Request() req) {
    const cv = await this.cvService.findOne(+id);

    if (cv?.user.id !== req.user.userId) {
      throw new ForbiddenException(
        'Vous ne pouvez supprimer que vos propres CV',
      );
    }

    return this.cvService.remove(+id);
  }

  // Version 2 - Non protégée
  @Version('2')
  @Post()
  createV2(@Body() createCvDto: CreateCvDto) {
    return this.cvService.create(createCvDto);
  }

  @Version('2')
  @Get()
  findAllV2() {
    return this.cvService.findAll();
  }

  @Version('2')
  @Get(':id')
  findOneV2(@Param('id') id: string) {
    return this.cvService.findOne(+id);
  }

  @Version('2')
  @Patch(':id')
  updateV2(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) {
    return this.cvService.update(+id, updateCvDto);
  }

  @Version('2')
  @Delete(':id')
  removeV2(@Param('id') id: string) {
    return this.cvService.remove(+id);
  }
}
