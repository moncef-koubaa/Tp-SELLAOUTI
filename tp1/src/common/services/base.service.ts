import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder, ObjectLiteral } from 'typeorm';
import { PaginationDto } from '../pagination/pagination.dto';
import { PaginatedResult } from '../interfaces/paginated-result.interface';

@Injectable()
export class BaseService<T extends ObjectLiteral> {
  constructor(private readonly repo: Repository<T>) {}

  async paginate(query: SelectQueryBuilder<T>, paginationDto: PaginationDto): Promise<PaginatedResult<T>> {
    const { page = 1, limit = 10 } = paginationDto;
    const [data, total] = await query.skip((page - 1) * limit).take(limit).getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
    };
  }
}
