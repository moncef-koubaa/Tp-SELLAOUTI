import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [JwtModule.register({ secret: 'your_secret_key' })],
  providers: [JwtAuthGuard],
  exports: [JwtAuthGuard], // Export to use in other modules
})
export class AuthModule {}
