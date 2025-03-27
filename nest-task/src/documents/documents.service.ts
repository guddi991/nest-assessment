/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { UpdateDocumentDto } from './dto/update-document.dto'
@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  async createDocument(title: string, description: string, filename: string) {
    const document = this.documentRepository.create({ title, description, filename });
    return this.documentRepository.save(document);
  }

  findAll() {
    return this.documentRepository.find();
  }

  findOne(id: number) {
    return this.documentRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const document = await this.documentRepository.findOne({ where: { id } });
    if (!document) throw new Error('Document not found');
    return this.documentRepository.remove(document);
  }

  // async getDocumentById(id: number): Promise<Document> {
  //   return this.documentRepository.findOne({ where: { id } });
    
  // }

  async getDocumentById(id: number): Promise<Document> {
    const document = await this.documentRepository.findOne({ where: { id } });
  
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
  
    return document;
  }
  

  async updateDocument(id: number, updateDto: { title?: string; description?: string }) {
    await this.documentRepository.update(id, updateDto);
    return this.getDocumentById(id);
  }
    async deleteDocument(id: number): Promise<void> {
    await this.documentRepository.delete(id);
  }
    
  
}
