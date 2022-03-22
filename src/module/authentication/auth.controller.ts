import { Controller, Body, Post, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPayload } from './payload.interface';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Get('whoami')
  @ApiBearerAuth()
  public async testAuth(@Req() req: any): Promise<JwtPayload> {
    return req.user;
  }
}
