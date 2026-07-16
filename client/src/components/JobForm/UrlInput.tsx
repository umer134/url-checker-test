import styles from "./JobForm.module.css";

interface Props {
  value: string;

  onChange(value: string): void;

  onRemove(): void;

  error?: boolean;
}

export function UrlInput({ value, onChange, onRemove, error }: Props) {
  return (
    <div className={styles.urlRow}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://example.com"
        className={error ? styles.errorInput : ""}
      />

      <button
        type="button"
        onClick={onRemove}
        className={styles.removeButton}
        aria-label="Remove URL"
      >
        ×
      </button>
    </div>
  );
}
