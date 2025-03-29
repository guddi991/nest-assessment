/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DocumentsModule } from './documents/documents.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { IngestionModule } from './ingestion/ingestion.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'), // Serve uploaded files
  }),
  TypeOrmModule.forRoot(databaseConfig), UserModule, AuthModule, DocumentsModule, IngestionModule],
})
export class AppModule {}
