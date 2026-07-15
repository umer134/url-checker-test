export type JobStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "failed";

export type UrlStatus =
  | "pending"
  | "in_progress"
  | "success"
  | "error"
  | "cancelled";

export interface JobSummary {
  id: string;
  createdAt: string;
  status: JobStatus;

  total: number;
  success: number;
  errors: number;
}

export interface JobProgress {
  total: number;
  processed: number;
  success: number;
  errors: number;
}

export interface UrlResult {
  url: string;
  status: UrlStatus;

  httpStatus?: number;
  error?: string;

  startedAt?: string;
  finishedAt?: string;

  duration?: number;
}

export interface JobDetails {
  id: string;

  createdAt: string;
  startedAt?: string;
  finishedAt?: string;

  status: JobStatus;

  progress: JobProgress;

  urls: UrlResult[];
}
