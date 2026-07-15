import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './interfaces/job.interface';
import { JobStatus } from './types/job-status.enum';
import { UrlStatus } from './types/url-status.enum';
import { UrlProcessorService } from './url-processor/url-processor.service';

@Injectable()
export class JobsService {
  constructor(private readonly processor: UrlProcessorService) {}
  private jobs = new Map<string, Job>();

  create(createJobDto: CreateJobDto): string {
    const jobId = uuidv4();
    const job: Job = {
      id: jobId,
      createdAt: new Date(),
      status: JobStatus.Pending,
      cancelled: false,
      urls: createJobDto.urls.map((url) => ({
        url: url,
        status: UrlStatus.Pending,
      })),
    };

    this.jobs.set(jobId, job);
    void this.processor.process(job);

    return jobId;
  }

  findAll() {
    return Array.from(this.jobs.values()).map((job) => ({
      id: job.id,
      createdAt: job.createdAt,
      status: job.status,
      total: job.urls.length,
      success: job.urls.filter((item) => item.status === UrlStatus.Success)
        .length,
      errors: job.urls.filter((item) => item.status === UrlStatus.Error).length,
    }));
  }

  private getJobEntity(id: string): Job {
    const job = this.jobs.get(id);

    if (!job) {
      throw new NotFoundException(`Job ${id} not found`);
    }

    return job;
  }

  findOne(id: string) {
    const job = this.getJobEntity(id);

    const processed = job.urls.filter(
      (item) =>
        item.status !== UrlStatus.Pending &&
        item.status !== UrlStatus.InProgress,
    ).length;

    return {
      id: job.id,

      createdAt: job.createdAt,

      startedAt: job.startedAt,

      finishedAt: job.finishedAt,

      status: job.status,

      cancelled: job.cancelled,

      progress: {
        total: job.urls.length,

        processed,

        success: job.urls.filter((item) => item.status === UrlStatus.Success)
          .length,

        errors: job.urls.filter((item) => item.status === UrlStatus.Error)
          .length,
      },

      urls: job.urls.map((item) => ({
        url: item.url,

        status: item.status,

        httpStatus: item.httpStatus,

        error: item.error,

        startedAt: item.startedAt,

        finishedAt: item.finishedAt,

        duration: item.duration,
      })),
    };
  }

  cancel(id: string) {
    const job = this.getJobEntity(id);
    if (job.status === JobStatus.Completed || job.status === JobStatus.Failed) {
      return {
        success: false,
        message: 'Job already finished',
      };
    }

    job.cancelled = true;
    job.status = JobStatus.Cancelled;
    job.urls.forEach((item) => {
      if (item.status === UrlStatus.Pending) {
        item.status = UrlStatus.Cancelled;
      }
    });

    return {
      success: true,
    };
  }
}
