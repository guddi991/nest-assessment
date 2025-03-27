/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255})
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false }) // Prevent password from being selected by default
  password: string;

  @Column({ default: 'viewer' }) // Role: admin, editor, viewer
  role: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
  
}
