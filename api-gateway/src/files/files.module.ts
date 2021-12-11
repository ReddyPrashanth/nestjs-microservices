import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { FilesService } from './files.service';

@Module({
  imports: [ConfigModule],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
