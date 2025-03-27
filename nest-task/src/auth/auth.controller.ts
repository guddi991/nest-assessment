/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard'
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: { email: string; password: string; role?: string }) {
    return this.authService.register(body.email, body.password, body.role);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Request() req) {
    return { message: "Logged out successfully" };
  }

}
