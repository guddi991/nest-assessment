/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingestion } from './entities/ingestion.entity';
import axios from 'axios';

@Injectable()
export class IngestionService {
  constructor(
    @InjectRepository(Ingestion)
    private ingestionRepo: Repository<Ingestion>,
  ) {}

  async triggerIngestion(): Promise<Ingestion> {
    const ingestion = this.ingestionRepo.create({ status: 'PENDING' });
    await this.ingestionRepo.save(ingestion);

    // Call Python API to start ingestion
    try {
      await axios.post('http://python-backend:8000/start-ingestion', {
        ingestion_id: ingestion.id,
      });
      await this.ingestionRepo.update(ingestion.id, { status: 'IN_PROGRESS' });
    } catch (error) {
      await this.ingestionRepo.update(ingestion.id, { status: 'FAILED' });
    }

    return ingestion;
  }

  async getIngestionStatus(id: number): Promise<Ingestion | null> {
    return await this.ingestionRepo.findOne({ where: { id } }) || null;
}

  async updateIngestionStatus(id: number, status: string): Promise<void> {
    await this.ingestionRepo.update(id, { status });
  }
}
