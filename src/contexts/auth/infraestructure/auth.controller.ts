import { Body, Controller, Post, Req } from '@nestjs/common';
import { Public } from '../../shared/infraestructure/decorators/public.decorator';
import { Request } from 'express';
import { LoginCommand } from '../application/login/login.command';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterCommand } from '../application/register/register.command';
import { RefreshCommand } from '../application/refresh/refresh.command';

@Controller('auth')
export class AuthController {
  constructor(private commandBus: CommandBus) {}

  @Public()
  @Post('login')
  signIn(@Body() command: LoginCommand) {
    return this.commandBus.execute(command);
  }

  @Public()
  @Post('register')
  register(@Body() command: RegisterCommand) {
    return this.commandBus.execute(command);
  }

  @Post('refresh')
  refresh(@Req() req: Request) {
    const user = req['user'];
    const command = new RefreshCommand();
    command.userId = user.id;
    return this.commandBus.execute(command);
  }
}
