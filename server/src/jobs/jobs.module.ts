import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { UrlProcessorService } from './url-processor/url-processor.service';

@Module({
  imports: [],
  controllers: [JobsController],
  providers: [JobsService, UrlProcessorService],
  exports: [UrlProcessorService],
})
export class JobsModule {}
