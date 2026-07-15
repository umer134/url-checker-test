import { httpClient } from "./http-client";
import { API_ENDPOINTS } from "./endpoints";
import type {
  CreateJobDto,
  JobDetailsResponse,
  JobsListResponse,
} from "../models/job/job.model";

const { JOBS } = API_ENDPOINTS;

export class JobsApi {
  async create(dto: CreateJobDto) {
    const { data } = await httpClient.post<string>(JOBS.CREATE, { dto });

    return data;
  }

  async getJobs() {
    const { data } = await httpClient.get<JobsListResponse>(JOBS.GET_ALL);

    return data;
  }

  async getJob(id: string) {
    const { data } = await httpClient.get<JobDetailsResponse>(JOBS.GET_ONE(id));

    return data;
  }

  async cancel(id: string) {
    return httpClient.delete(JOBS.DELETE(id));
  }
}
