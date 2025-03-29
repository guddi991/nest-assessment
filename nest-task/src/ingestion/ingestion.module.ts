import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngestionService } from './ingestion.service';
import { IngestionController } from './ingestion.controller';
import { Ingestion } from './entities/ingestion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ingestion])], // Register Ingestion entity
  providers: [IngestionService], // Register Service
  controllers: [IngestionController], // Register Controller
  exports: [IngestionService], // Ensure it's available to other modules if needed
})
export class IngestionModule {}
