import { UrlInput } from "./UrlInput";

import styles from "./JobForm.module.css";

interface Props {
  urls: string[];

  setUrls(urls: string[]): void;
}

export function UrlInputList({ urls, setUrls }: Props) {
  function updateUrl(index: number, value: string) {
    const copy = [...urls];

    copy[index] = value;

    setUrls(copy);
  }

  function removeUrl(index: number) {
    const copy = urls.filter((_, i) => i !== index);

    setUrls(copy.length ? copy : [""]);
  }

  function addUrl() {
    setUrls([...urls, ""]);
  }

  return (
    <div>
      <div className={styles.inputs}>
        {urls.map((url, index) => (
          <UrlInput
            key={index}
            value={url}
            onChange={(value) => updateUrl(index, value)}
            onRemove={() => removeUrl(index)}
          />
        ))}
      </div>

      <button type="button" className={styles.addButton} onClick={addUrl}>
        + Add URL
      </button>
    </div>
  );
}
