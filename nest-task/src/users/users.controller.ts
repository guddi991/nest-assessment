/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { RolesGuard } from '../common/roles.guard';
import { SetMetadata } from '@nestjs/common';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @SetMetadata('roles', ['admin'])
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  @SetMetadata('roles', ['admin'])
  updateUserRole(@Param('id') id: number, @Body() body: { role: string }) {
    return this.userService.updateUserRole(id, body.role);
  }

  @Delete(':id')
  @SetMetadata('roles', ['admin'])
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
