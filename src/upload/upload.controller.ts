import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './upload.service';

@Controller('/files')
export class FilesController {
  constructor(private readonly s3Service: S3Service) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    const fileUrl = await this.s3Service.uploadFile(file);
    return fileUrl;
  }
}
