import type { ReactNode } from "react";

import styles from "./Dashboard.module.css";

interface Props {
  jobs: ReactNode;
  details: ReactNode;
}

export function Dashboard({ jobs, details }: Props) {
  return (
    <div className={styles.dashboard}>
      <section className={styles.jobs}>{jobs}</section>

      <section className={styles.details}>{details}</section>
    </div>
  );
}
