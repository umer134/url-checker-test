import type { JobStatus, UrlStatus } from "../../../types/job";

import styles from "./StatusBadge.module.css";

type Status = JobStatus | UrlStatus;

interface Props {
  status: Status;
}

const labels: Record<Status, string> = {
  pending: "Waiting",

  in_progress: "Running",

  completed: "Completed",

  success: "Success",

  failed: "Failed",

  error: "Error",

  cancelled: "Cancelled",
};

export function StatusBadge({ status }: Props) {
  return (
    <span
      className={`
        ${styles.badge}
        ${styles[status]}
      `}
    >
      {labels[status]}
    </span>
  );
}
