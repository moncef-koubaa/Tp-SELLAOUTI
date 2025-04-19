import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { AuthedUser } from 'src/users/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { SignUpDto } from './dto/signup.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('auth/signup')
  async signUp(@Body() data: SignUpDto) {
    return this.authService.signUp(data);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@AuthedUser() user: User) {
    return this.authService.login(user);
  }
}
