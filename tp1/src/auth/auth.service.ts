import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneBy({ username });
    if (user) {
      const isPasswordValid = await bcrypt.compare(pass, user.password);

      if (isPasswordValid) {
        const { password, salt, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async signUp(data: SignUpDto): Promise<User> {
    const { email, username, password } = data;

    if (!email) {
      const existingEmail = await this.usersService.findOneBy({ email });
      if (existingEmail) {
        throw new ConflictException('Email already exists');
      }
    } else if (!username) {
      const existingUsername = await this.usersService.findOneBy({ username });
      if (existingUsername) {
        throw new ConflictException('Username already exists');
      }
    } else {
      throw new BadRequestException('Email or username is required');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = this.usersService.create({
      username,
      email,
      salt,
      password: hashedPassword,
    });

    return newUser;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
