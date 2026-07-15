import { JobStatus } from '@/jobs/types/job-status.enum';
import { UrlResult } from './url-result.interface';

export interface Job {
  id: string;
  createdAt: Date;
  status: JobStatus;
  cancelled: boolean;
  startedAt?: Date;
  finishedAt?: Date;
  urls: UrlResult[];
}
