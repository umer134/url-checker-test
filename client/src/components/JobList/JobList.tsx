import { useEffect } from "react";

import { useJobs } from "../../hooks/useJobs";

import { JobCard } from "./JobCard";

import { Card } from "../UI/Card/Card";

import styles from "./JobList.module.css";

export function JobList() {
  const {
    jobs,

    activeJobId,

    loadJobs,

    loadJob,
  } = useJobs();

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <Card>
      <h2>Jobs</h2>

      {jobs.length === 0 ? (
        <div className={styles.empty}>No jobs yet</div>
      ) : (
        <div className={styles.scrollArea}>
          <div className={styles.list}>
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                active={job.id === activeJobId}
                onClick={() => {
                  loadJob(job.id);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
