import type { JobDetails, JobSummary } from "../../types/job";
import type { JobDetailsResponse, JobsListItem } from "./job.model";

export class JobAdapter {
  static toPreviewJob(dto: JobsListItem): JobSummary {
    return {
      id: dto.id,
      createdAt: dto.createdAt,
      status: dto.status,

      total: dto.total,
      success: dto.success,
      errors: dto.errors,
    };
  }

  static toJobDetails(dto: JobDetailsResponse): JobDetails {
    return {
      id: dto.id,
      createdAt: dto.createdAt,
      startedAt: dto.startedAt ?? undefined,
      finishedAt: dto.finishedAt ?? undefined,
      progress: dto.progress,
      status: dto.status,
      urls: dto.urls ?? [],
    };
  }
}
