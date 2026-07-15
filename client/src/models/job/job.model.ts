import type { paths } from "../../api/schema";

export type CreateJobDto =
  paths["/api/jobs"]["post"]["requestBody"]["content"]["application/json"];

export type JobsListResponse =
  paths["/api/jobs"]["get"]["responses"]["200"]["content"]["application/json"];

export type JobsListItem = JobsListResponse[number];

export type JobDetailsResponse =
  paths["/api/jobs/{id}"]["get"]["responses"]["200"]["content"]["application/json"];
