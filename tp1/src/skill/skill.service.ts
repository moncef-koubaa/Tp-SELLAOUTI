import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { Cv } from 'src/cv/entities/cv.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
  ) {}
  async create(createSkillDto: CreateSkillDto) {
    const cvs = await this.cvRepository
      .createQueryBuilder('cv')
      .where('cv.id IN (:...ids)', { ids: createSkillDto.cvIds })
      .getMany();
    const skill = this.skillRepository.create({
      ...createSkillDto,
      cvs: cvs,
    });
    return this.skillRepository.save(skill);
  }

  async findAll() {
    return await this.skillRepository.find({
      relations: ['cvs'],
    });
  }

  async findOne(id: number) {
    return await this.skillRepository.findOne({
      where: { id: id },
      relations: ['cvs'],
    });
  }

  update(id: number, updateSkillDto: UpdateSkillDto) {
    return `This action updates a #${id} skill`;
  }

  remove(id: number) {
    return this.skillRepository.delete(id);
  }
}
