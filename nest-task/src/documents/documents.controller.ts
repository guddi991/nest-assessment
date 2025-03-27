/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  BadRequestException,
  Param,
  Get,
  Put,
  Delete,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express } from 'express';
import { DocumentsService } from './documents.service';
import { join } from 'path';  // ✅ Import join from 'path'
import * as fs from 'fs';  // ✅ Import fs module
import { Response } from 'express';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Folder where files are saved
        filename: (req, file, cb) => {
          const uniqueFilename = `${Date.now()}-${file.originalname}`;
          cb(null, uniqueFilename);
        },
      }),
    }),
  )
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { title: string; description: string },
  ) {
    if (!file) {
      throw new BadRequestException('File is missing. Please attach a file.');
    }

    if (!body.title || !body.description) {
      throw new BadRequestException('Title and description are required.');
    }

    return this.documentsService.createDocument(
      body.title,
      body.description,
      file.filename,
    );
  }

  // Get All Documents
  // @Get('files/:filename')
  // getFile(@Param('filename') filename: string, @Res() res: Response) {
  //   const filePath = join(__dirname, '..', '..', 'uploads', filename);

  //   // Check if file exists
  //   if (!fs.existsSync(filePath)) {
  //     return res.status(404).json({ message: 'File not found' });
  //   }

  //   return res.sendFile(filePath);
  // }

  @Get('files/:filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '..', '..', 'uploads', filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).send({ message: 'File not found' }); // ✅ Corrected
    }

    return res.sendFile(filePath);
  }

  // Get Single Document
  @Get(':id')
  async getDocumentById(@Param('id') id: number) {
    return this.documentsService.getDocumentById(id);
  }

  // Update Document (title & description)
  @Put(':id')
  async updateDocument(
    @Param('id') id: number,
    @Body() body: { title: string; description: string },
  ) {
    return this.documentsService.updateDocument(id, body); // ✅ Pass as an object
  }
  
  // Delete Document
  @Delete(':id')
  async deleteDocument(@Param('id') id: number) {
    return this.documentsService.deleteDocument(id);
  }
}
