/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Param, Put, Body } from '@nestjs/common';
import { IngestionService } from './ingestion.service';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post('trigger')
  async triggerIngestion() {
    return this.ingestionService.triggerIngestion();
  }

  @Get(':id')
  async getStatus(@Param('id') id: number) {
    return this.ingestionService.getIngestionStatus(id);
  }

  @Put(':id/status')
  async updateStatus(@Param('id') id: number, @Body('status') status: string) {
    return this.ingestionService.updateIngestionStatus(id, status);
  }
}
