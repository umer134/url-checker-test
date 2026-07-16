import { useMemo, useState } from "react";

import { Card } from "../UI/Card/Card";

import { Button } from "../UI/Button/Button";

import { UrlInputList } from "./UrlInputList";

import styles from "./JobForm.module.css";
import { useJobs } from "../../hooks/useJobs";

function validateUrl(value: string) {
  try {
    new URL(value);

    return true;
  } catch {
    return false;
  }
}

export function JobForm() {
  const [urls, setUrls] = useState<string[]>([""]);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const { createJob } = useJobs();

  const validUrls = useMemo(() => {
    return urls.filter((url) => validateUrl(url));
  }, [urls]);

  async function handleSubmit() {
    if (!validUrls.length) return;

    try {
      setSubmitting(true);

      await createJob(validUrls);

      setUrls([""]);
    } finally {
      setSubmitting(false);
    }
  }

  function handlePaste(event: React.ClipboardEvent) {
    const text = event.clipboardData.getData("text");

    const pasted = text.split(/\s+/).filter(Boolean);

    if (pasted.length > 1) {
      event.preventDefault();

      setUrls(pasted);
    }
  }

  return (
    <Card>
      <h2>Create URL check</h2>

      <p className={styles.subtitle}>Add URLs you want to verify</p>

      <div onPaste={handlePaste}>
        <UrlInputList urls={urls} setUrls={setUrls} />
      </div>

      <div className={styles.footer}>
        <span>{validUrls.length} URLs ready</span>

        <Button
          disabled={submitting || validUrls.length === 0}
          onClick={handleSubmit}
        >
          {submitting ? "Starting..." : "Start checking"}
        </Button>
      </div>
    </Card>
  );
}
