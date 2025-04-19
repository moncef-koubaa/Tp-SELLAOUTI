import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['auth-user'] as string;

    if (!token) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Accès refusé - Token manquant',
      });
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      if (!payload.userId) {
        throw new UnauthorizedException('Token invalide - userId manquant');
      }

      request.user = payload;
      return true;
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Token invalide ou expiré',
      });
    }
  }
}
