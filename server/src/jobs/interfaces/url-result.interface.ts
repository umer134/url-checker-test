import { UrlStatus } from '@/jobs/types/url-status.enum';

export interface UrlResult {
  url: string;
  status: UrlStatus;
  httpStatus?: number;
  error?: string;
  startedAt?: Date;
  finishedAt?: Date;
  duration?: number;
}
