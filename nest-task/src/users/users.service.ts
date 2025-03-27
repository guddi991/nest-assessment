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
  

  // async create(createUserDto: CreateUserDto): Promise<User> {
  //   const newUser = this.userRepository.create(createUserDto);
  //   newUser.password = await bcrypt.hash(createUserDto.password, 10);
  //   return await this.userRepository.save(newUser);
  // }
  
  async createUser(email: string, password: string, role: string = 'viewer') {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password before saving
    const user = this.userRepository.create({ email, password: hashedPassword, role });
    return this.userRepository.save(user);
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

  async findByEmail(email: string, includePassword = false): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
      select: includePassword ? ['id', 'email', 'password', 'role'] : ['id', 'email', 'role'],
    });
  }
  
  async updateUserRole(id: number, role: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new Error('User not found');
    user.role = role;
    return this.userRepository.save(user);
  }
  
  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new Error('User not found');
    return this.userRepository.remove(user);
  }
  

}
