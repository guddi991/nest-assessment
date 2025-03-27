/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { UserModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), UserModule],
})
export class AppModule {}
