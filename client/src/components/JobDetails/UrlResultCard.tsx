import type { UrlResult } from "../../types/job";

import { StatusBadge } from "../UI/StatusBadge/StatusBadge";

import styles from "./JobDetails.module.css";

interface Props {
  item: UrlResult;
}

export function UrlResultCard({ item }: Props) {
  return (
    <div className={styles.urlCard}>
      <div className={styles.url}>{item.url}</div>

      <StatusBadge status={item.status} />

      {item.httpStatus && <span>HTTP {item.httpStatus}</span>}

      {item.duration && <span>{item.duration} ms</span>}

      {item.error && <p className={styles.error}>{item.error}</p>}
    </div>
  );
}
