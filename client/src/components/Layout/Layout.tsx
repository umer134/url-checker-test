import type { ReactNode } from "react";

import styles from "./Layout.module.css";

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1>URL Checker</h1>

          <p>Async URL validation service</p>
        </div>
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
