/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log("🔍 Searching user by email:", email);
    
    const user = await this.usersService.findByEmail(email, true);
    if (!user) {
      console.log("User not found");
      throw new UnauthorizedException('Invalid credentials');
    }
  
    console.log("Checking password...");
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      console.log("Password mismatch");
      throw new UnauthorizedException('Invalid credentials');
    }
  
    console.log("Login successful:", user.email);
    const { password: _, ...result } = user;
    return result;
  }
  

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(email: string, password: string, role: string = 'viewer') {
    return this.usersService.createUser(email, password, role);
  }
  
}
