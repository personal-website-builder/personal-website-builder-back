import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from '../shared/decorators/public.decorator';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  signIn(@Body() loginDto: LoginDto) {
    console.log(loginDto);
    return this.authService.signIn(loginDto);
  }

  @Public()
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return registerDto;
    return this.authService.register(registerDto);
  }

  @Post('refresh')
  refresh(@Req() req: Request) {
    const accessToken = req.headers.authorization.split(' ')[1];
    console.log(accessToken);
    const user = req['user'];
    return this.authService.refresh(user);
  }
}
