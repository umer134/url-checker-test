import type { ReactNode } from "react";

import styles from "./Modal.module.css";

interface Props {
  open: boolean;

  children: ReactNode;

  onClose(): void;
}

export function Modal({ open, children, onClose }: Props) {
  if (!open) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
