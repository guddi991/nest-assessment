/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  // Create (Upload Document)
  async createDocument(title: string, description: string, filename: string) {
    const document = this.documentRepository.create({ title, description, filename });
    return await this.documentRepository.save(document);
  }

  // Get all documents
  async getAllDocuments(): Promise<Document[]> {
    return await this.documentRepository.find();
  }

  // Get single document by ID
  async getDocumentById(id: number): Promise<Document> {
    const document = await this.documentRepository.findOne({ where: { id } });
    if (!document) throw new NotFoundException(`Document with ID ${id} not found`);
    return document;
  }

  // Update Document
  async updateDocument(id: number, title: string, description: string) {
    const document = await this.getDocumentById(id);
    document.title = title;
    document.description = description;
    return await this.documentRepository.save(document);
  }

  // Delete Document
  async deleteDocument(id: number): Promise<void> {
    const result = await this.documentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
  }
}
