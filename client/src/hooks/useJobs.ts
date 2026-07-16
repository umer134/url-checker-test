import { toast } from "sonner";
import { jobsService } from "../services/jobs.service";
import { useJobsStore } from "../store/jobs.store";
import type { JobDetails } from "../types/job";

export function useJobs() {
  const store = useJobsStore();

  const loadJobs = async () => {
    try {
      store.setLoading(true);

      const jobs = await jobsService.getJobs();

      store.setJobs(jobs);
    } catch (error) {
      if (error instanceof Error) {
        store.setError(`Failed to load jobs: ${error.message}`);
      } else {
        store.setError(String(error));
      }
    } finally {
      store.setLoading(false);
    }
  };

  const createJob = async (urls: string[]) => {
    try {
      store.setLoading(true);

      const response = await jobsService.create(urls);

      const job = await jobsService.getJob(response.jobId);

      store.setActiveJobId(response.jobId);

      store.setActiveJob(job);

      window.dispatchEvent(new Event("active-job-created"));

      const jobs = await jobsService.getJobs();

      const created = jobs.find((item) => item.id === response.jobId);

      if (created) {
        store.addJob(created);
      }

      toast.success("Job created successfully");

      return response.jobId;
    } catch (error) {
      if (error instanceof Error) {
        store.setError(`Failed to create job: ${error.message}`);
        toast.error(`error: ${error.message}`);
      } else {
        store.setError(String(error));
        toast.error(String(error));
      }
    } finally {
      store.setLoading(false);
    }
  };

  const updateJobInList = (job: JobDetails) => {
    const summary = {
      id: job.id,
      createdAt: job.createdAt,
      status: job.status,
      total: job.progress.total,
      success: job.progress.success,
      errors: job.progress.errors,
    };

    store.updateJob(summary);
  };

  const loadJob = async (id: string) => {
    store.setActiveJobId(id);

    const job = await jobsService.getJob(id);

    const current = useJobsStore.getState().activeJobId;

    if (current !== id) {
      return;
    }

    store.setActiveJob(job);

    updateJobInList(job);

    return job;
  };

  const cancelJob = async () => {
    const id = store.activeJob?.id;

    if (!id) return;

    await jobsService.cancel(id);

    await loadJob(id);
  };

  return {
    jobs: store.jobs,
    activeJob: store.activeJob,
    activeJobId: store.activeJobId,
    loading: store.loading,
    error: store.error,
    loadJobs,
    createJob,
    loadJob,
    cancelJob,
  };
}
