import { IS_PUBLIC_KEY } from '../../shared/infraestructure/decorators/public.decorator';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { envs } from '../../../config/envs';
import { AppLogger } from 'src/contexts/shared/infraestructure/loggers/app-logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new AppLogger(AuthGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    this.logger.log(`isPublic: ${isPublic}`);

    if (isPublic) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      this.logger.log('Token not found');
      throw new UnauthorizedException();
    }
    try {
      if (request.path.includes('auth/refresh')) {
        request['user'] = await this.jwtService.decode(token);
      } else {
        request['user'] = await this.jwtService.verifyAsync(token, {
          secret: envs.jwtSecret,
        });
      }
    } catch {
      this.logger.log('Invalid token');
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
