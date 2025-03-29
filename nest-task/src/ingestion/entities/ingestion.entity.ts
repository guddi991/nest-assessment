/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Ingestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string; // PENDING, IN_PROGRESS, COMPLETED, FAILED

  @CreateDateColumn()
  createdAt: Date;
}
