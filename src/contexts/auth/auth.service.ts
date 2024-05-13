import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  async refresh(userId: string) {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    const { password: _, ...result } = user;
    const jwtSecret = await this.jwtService.sign({ user: result });
    const jwtRefresh = this.jwtService.sign(
      { user: result },
      { expiresIn: '7d' },
    );
    return {
      accessToken: jwtSecret,
      refreshToken: jwtRefresh,
      user: result,
    };
  }
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    const jwtSecret = await this.jwtService.sign({ user: result });
    const jwtRefresh = this.jwtService.sign(
      { user: result },
      { expiresIn: '7d' },
    );
    return {
      accessToken: jwtSecret,
      refreshToken: jwtRefresh,
      user: result,
    };
  }

  async register(registerDto: RegisterDto): Promise<any> {
    console.log(registerDto);
    const hashedPassword = bcrypt.hashSync(registerDto.password, 10);
    const user = await this.usersService.create(
      registerDto.email,
      registerDto.name,
      hashedPassword,
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    const jwtSecret = await this.jwtService.sign({ user: result });
    const jwtRefresh = this.jwtService.sign(
      { user: result },
      { expiresIn: '7d' },
    );
    return {
      accessToken: jwtSecret,
      refreshToken: jwtRefresh,
      user: result,
    };
  }
}
