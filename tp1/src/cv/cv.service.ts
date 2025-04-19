import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import { GetCvFilterDto } from './dto/get-cv-filter.dto';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}
  async create(createCvDto: CreateCvDto) {
    const user = await this.userRepository.findOne({
      where: { id: createCvDto.userId },
    });
    if (!user) {
      throw new Error(`User with id ${createCvDto.userId} not found`);
    }
    const skills = await this.skillRepository
      .createQueryBuilder('skill')
      .where('skill.id IN (:...ids)', { ids: createCvDto.skills })
      .getMany();
    if (skills.length !== createCvDto.skills.length) {
      throw new Error(`Some skills not found`);
    }
    const cv = this.cvRepository.create({
      ...createCvDto,
      user: user,
      skills: skills,
    });
    return this.cvRepository.save(cv);
  }

  async findAll() {
    const cvs = await this.cvRepository.find({
      relations: ['user', 'skills'],
    });
    return cvs.map((cv) => ({
      ...cv,
      user: {
        ...cv.user,
        password: undefined,
      },
      skills: cv.skills.map((skill) => ({
        ...skill,
        cvs: undefined,
      })),
    }));
  }

  async findOne(id: number) {
    return this.cvRepository.findOne({
      where: { id },
      relations: ['user', 'skills'],
    });
  }

  async update(id: number, updateCvDto: UpdateCvDto) {}

  async remove(id: number) {
    return this.cvRepository.delete(id);
  }

  async getCvs(filterDto: GetCvFilterDto): Promise<Cv[]> {
    const { critere, age } = filterDto;
    const query = this.cvRepository.createQueryBuilder('cv');

    if (critere) {
      query.andWhere(
        '(cv.name ILIKE :c OR cv.firstname ILIKE :c OR cv.job ILIKE :c)',
        { c: `%${critere}%` },
      );
    }

    if (age !== undefined) {
      query.andWhere('cv.age = :age', { age });
    }

    return await query.getMany();
  }
}
