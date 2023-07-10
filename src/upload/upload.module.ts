import { Module } from '@nestjs/common';
import { FilesController } from "./upload.controller";
import { S3Service } from "./upload.service";
import { DatabaseModule } from "../database/database.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [FilesController],
  providers: [S3Service]
})
export class UploadModule {}
