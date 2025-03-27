import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { Document } from './entities/document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document])], // ✅ Register Document Entity
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService], // ✅ Export if needed in other modules
})
export class DocumentsModule {}
