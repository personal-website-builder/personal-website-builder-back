import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() loginDto: LoginDto) {
    console.log(loginDto);
    return this.authService.signIn(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return registerDto;
    return this.authService.register(registerDto);
  }
}
