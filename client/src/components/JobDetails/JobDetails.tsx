import { useJobs } from "../../hooks/useJobs";

import { useJobPolling } from "../../hooks/useJobPolling";

import { Card } from "../UI/Card/Card";

import { StatusBadge } from "../UI/StatusBadge/StatusBadge";

import { Button } from "../UI/Button/Button";

import { UrlResultCard } from "./UrlResultCard";

import styles from "./JobDetails.module.css";
import { useEffect, useRef, useState } from "react";
import { CancelJobModal } from "./CancelJobModal";

export function JobDetails() {
  const [cancelOpen, setCancelOpen] = useState<boolean>(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const detailsRef = useRef<HTMLDivElement | null>(null);

  const { activeJob, cancelJob } = useJobs();

  useEffect(() => {
    const handler = () => {
      detailsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    window.addEventListener("active-job-created", handler);

    return () => {
      window.removeEventListener("active-job-created", handler);
    };
  }, []);

  async function handleCancel() {
    try {
      setCancelLoading(true);

      await cancelJob();

      setCancelOpen(false);
    } finally {
      setCancelLoading(false);
    }
  }

  useJobPolling(activeJob?.id ?? null);

  if (!activeJob) {
    return (
      <Card>
        <div className={styles.empty}>Select job to see details</div>
      </Card>
    );
  }

  const { progress } = activeJob;

  const percent = Math.round((progress.processed / progress.total) * 100);

  const finished = ["completed", "failed", "cancelled"].includes(
    activeJob.status,
  );

  return (
    <div ref={detailsRef} className={styles.container}>
      <Card>
        <div className={styles.header}>
          <div className={styles.title}>
            <h2>Active Job</h2>
            <StatusBadge status={activeJob.status} />
          </div>

          {!finished && (
            <Button variant="danger" onClick={() => setCancelOpen(true)}>
              Cancel Job
            </Button>
          )}
        </div>

        <div className={styles.progressText}>
          {progress.processed}/{progress.total}
          processed
        </div>

        <div className={styles.progressBar}>
          <div
            style={{
              width: `${percent}%`,
            }}
          />
        </div>

        <div className={styles.urlsScroll}>
          <div className={styles.urls}>
            {activeJob.urls.map((item) => (
              <UrlResultCard key={item.url} item={item} />
            ))}
          </div>
        </div>
        <CancelJobModal
          open={cancelOpen}
          loading={cancelLoading}
          onClose={() => setCancelOpen(false)}
          onConfirm={handleCancel}
        />
      </Card>
    </div>
  );
}
