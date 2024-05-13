import { envs } from './../../config/envs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AccessTokenPayload } from './models/access-token-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginDto): Promise<any> {
    const user = await this.usersService.findOneByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!bcrypt.compareSync(loginDto.password, user.password)) {
      throw new UnauthorizedException();
    }

    const accessTokenPayload: AccessTokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const jwtSecret = await this.jwtService.sign(accessTokenPayload, {
      secret: envs.jwtSecret,
    });

    const jwtRefresh = this.jwtService.sign(
      { id: user.id },
      { expiresIn: '7d', secret: envs.jwtRefreshSecret },
    );

    await this.usersService.updateRefreshToken(user.id, jwtRefresh);

    return {
      accessToken: jwtSecret,
    };
  }

  async register(registerDto: RegisterDto): Promise<any> {
    const hashedPassword = bcrypt.hashSync(registerDto.password, 10);
    const user = await this.usersService.create(
      registerDto.email,
      registerDto.name,
      hashedPassword,
    );

    const accessTokenPayload: AccessTokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const jwtSecret = await this.jwtService.sign(accessTokenPayload, {
      secret: envs.jwtSecret,
    });

    const jwtRefresh = this.jwtService.sign(
      { id: user.id },
      { expiresIn: '7d', secret: envs.jwtRefreshSecret },
    );

    await this.usersService.updateRefreshToken(user.id, jwtRefresh);

    return {
      accessToken: jwtSecret,
    };
  }

  async refresh(userId: string) {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }

    try {
      this.jwtService.verify<AccessTokenPayload>(user.refreshToken, {
        secret: envs.jwtRefreshSecret,
      });
    } catch {
      throw new UnauthorizedException();
    }

    const accessTokenPayload: AccessTokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const jwtSecret = await this.jwtService.sign(accessTokenPayload, {
      secret: envs.jwtSecret,
    });

    return {
      accessToken: jwtSecret,
    };
  }
}
