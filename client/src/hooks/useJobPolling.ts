import { useEffect, useRef } from "react";

import { useJobs } from "./useJobs";

export function useJobPolling(jobId: string | null) {
  const { loadJob } = useJobs();

  const currentJob = useRef<string | null>(null);

  useEffect(() => {
    if (!jobId) return;

    currentJob.current = jobId;

    let cancelled = false;

    async function poll() {
      try {
        if (!jobId) return;

        const result = await loadJob(jobId);

        if (cancelled || currentJob.current !== jobId) {
          return;
        }

        if (
          result?.status === "completed" ||
          result?.status === "failed" ||
          result?.status === "cancelled"
        ) {
          return;
        }

        setTimeout(poll, 2000);
      } catch {
        if (!cancelled) {
          setTimeout(poll, 3000);
        }
      }
    }

    poll();

    return () => {
      cancelled = true;
    };
  }, [jobId]);
}
