/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    newUser.password = await bcrypt.hash(createUserDto.password, 10);
    return await this.userRepository.save(newUser);
  }
  
  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['id', 'email', 'role'], // Exclude password from response
    });
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'role'], // Exclude password from response
    });
  }
    
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.findOne(id);
    
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  
    return updatedUser;
  }
    
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }


}
