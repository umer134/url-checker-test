import { Injectable } from '@nestjs/common';
import { Job } from '../interfaces/job.interface';
import { JobStatus } from '../types/job-status.enum';
import { UrlStatus } from '../types/url-status.enum';
import { UrlResult } from '../interfaces/url-result.interface';

@Injectable()
export class UrlProcessorService {
  async process(job: Job) {
    job.status = JobStatus.InProgress;
    job.startedAt = new Date();

    let index = 0;

    const worker = async () => {
      while (true) {
        if (job.cancelled) {
          return;
        }

        const currentIndex = index++;

        if (currentIndex >= job.urls.length) {
          return;
        }

        const current = job.urls[currentIndex];

        await this.processUrl(current);

        if (job.cancelled) {
          return;
        }
      }
    };

    const workers = Array.from({ length: 5 }, () => worker());

    await Promise.all(workers);

    if (!job.cancelled) {
      const hasErrors = job.urls.some((x) => x.status === UrlStatus.Error);

      job.status = hasErrors ? JobStatus.Failed : JobStatus.Completed;
      job.finishedAt = new Date();
    }
  }

  private async processUrl(item: UrlResult) {
    console.log('START', item.url, new Date().toISOString());
    item.status = UrlStatus.InProgress;
    item.startedAt = new Date();

    try {
      const response = await fetch(item.url, {
        method: 'HEAD',
      });

      await this.delay(Math.floor(Math.random() * 6000));

      item.httpStatus = response.status;
      item.status = UrlStatus.Success;
    } catch (error) {
      item.status = UrlStatus.Error;
      if (error instanceof Error) {
        item.error = error.message;
      } else {
        item.error = String(error);
      }
    }

    item.finishedAt = new Date();

    item.duration = item.finishedAt.getTime() - item.startedAt.getTime();
    console.log('END', item.url);
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
