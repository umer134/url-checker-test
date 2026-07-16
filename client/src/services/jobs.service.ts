import { JobsApi } from "../api/jobs.api";
import { JobAdapter } from "../models/job/job.adapter";

class JobsService {
  private api = new JobsApi();

  async getJobs() {
    const response = await this.api.getJobs();

    return response.map(JobAdapter.toPreviewJob);
  }

  async getJob(id: string) {
    const response = await this.api.getJob(id);

    return JobAdapter.toJobDetails(response);
  }

  async create(urls: string[]) {
    return this.api.create({ urls });
  }

  async cancel(id: string) {
    return this.api.cancel(id);
  }
}

export const jobsService = new JobsService();
