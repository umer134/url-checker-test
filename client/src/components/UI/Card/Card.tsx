import type { ReactNode } from "react";

import styles from "./Card.module.css";

interface Props {
  children: ReactNode;

  className?: string;
}

export function Card({ children, className = "" }: Props) {
  return (
    <section className={`${styles.card} ${className}`}>{children}</section>
  );
}
