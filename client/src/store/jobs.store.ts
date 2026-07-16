import { create } from "zustand";

import type { JobDetails, JobSummary } from "../types/job";

interface JobsState {
  jobs: JobSummary[];

  activeJobId: string | null;

  activeJob: JobDetails | null;

  loading: boolean;

  error: string | null;

  setJobs(jobs: JobSummary[]): void;

  addJob(job: JobSummary): void;

  updateJob(job: JobSummary): void;

  setActiveJobId(id: string | null): void;

  setActiveJob(job: JobDetails | null): void;

  setLoading(value: boolean): void;

  setError(error: string | null): void;
}

export const useJobsStore = create<JobsState>((set) => ({
  jobs: [],

  activeJobId: null,

  activeJob: null,

  loading: false,

  error: null,

  setJobs(jobs) {
    set({
      jobs,
    });
  },

  addJob(job) {
    set((state) => ({
      jobs: [job, ...state.jobs],
    }));
  },

  updateJob(job) {
    set((state) => ({
      jobs: state.jobs.map((item) => (item.id === job.id ? job : item)),
    }));
  },

  setActiveJobId(id) {
    set({
      activeJobId: id,
    });
  },

  setActiveJob(job: JobDetails) {
    set({
      activeJob: job,
    });
  },

  setLoading(value) {
    set({
      loading: value,
    });
  },

  setError(error) {
    set({
      error,
    });
  },
}));
