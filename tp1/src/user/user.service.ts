import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Cv } from 'src/cv/entities/cv.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
  ) {}
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
  async create(createUserDto: CreateUserDto) {
    let cvs = new Array<Cv>();

    if (createUserDto.cvIds && createUserDto.cvIds.length > 0) {
      cvs = await this.cvRepository
        .createQueryBuilder('cv')
        .where('cv.id IN (:...ids)', { ids: createUserDto.cvIds })
        .getMany();

      if (cvs.length !== createUserDto.cvIds.length) {
        throw new Error(`Some CVs not found`);
      }
    }
    const password = await this.hashPassword(createUserDto.password);
    createUserDto.password = password;

    const user = this.userRepository.create({
      ...createUserDto,
      cvs,
    });
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({
      relations: ['cvs'],
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id: id },
      relations: ['cvs'],
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
