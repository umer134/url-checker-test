import type { JobSummary } from "../../types/job";

import { StatusBadge } from "../UI/StatusBadge/StatusBadge";

import styles from "./JobList.module.css";

interface Props {
  job: JobSummary;

  active: boolean;

  onClick(): void;
}

export function JobCard({ job, active, onClick }: Props) {
  const processed = job.success + job.errors;

  return (
    <button
      className={`
      ${styles.card}
      ${active ? styles.active : ""}
    `}
      onClick={onClick}
    >
      <div className={styles.header}>
        <StatusBadge status={job.status} />

        <time>{new Date(job.createdAt).toLocaleTimeString()}</time>
      </div>

      <div className={styles.progress}>
        <strong>{processed}</strong>/{job.total}
        <span>URLs processed</span>
      </div>

      <div className={styles.stats}>
        <span>✓ {job.success}</span>

        <span>✕ {job.errors}</span>
      </div>
    </button>
  );
}
