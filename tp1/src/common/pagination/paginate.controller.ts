import { Controller, Get, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../pagination/pagination.dto';
import { User } from '../../user/entities/user.entity';
import { Cv } from '../../cv/entities/cv.entity';
import { BaseService } from '../../common/services/base.service';

@Controller('paginate')
export class PaginateController {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Cv)
    private readonly cvRepo: Repository<Cv>,
  ) {}

  @Get()
  async paginate(
    @Query('entity') entity: string,
    @Query() paginationDto: PaginationDto,
  ) {
    let result;

    switch (entity.toLowerCase()) {
      case 'user':
        result = await new BaseService<User>(this.userRepo).paginate(
          this.userRepo.createQueryBuilder('user'),
          paginationDto,
        );
        break;

      case 'cv':
        result = await new BaseService<Cv>(this.cvRepo).paginate(
          this.cvRepo.createQueryBuilder('cv'),
          paginationDto,
        );
        break;

      default:
        throw new Error('Entity not found');
    }

    return result;
  }
}
