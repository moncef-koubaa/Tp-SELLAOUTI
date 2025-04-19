import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async findOneBy(query: Partial<User>): Promise<User | null> {
    return null;
  }

  async create(data: Partial<User>): Promise<User> {
    return {
      id: 1,
      email: data.email!,
      username: data.username!,
      password: data.password!,
      salt: data.salt!,
      role: ['USER'],
    };
  }
}
