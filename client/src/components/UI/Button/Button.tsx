import type { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;

  variant?: "primary" | "danger" | "secondary";
}

export function Button({
  children,

  variant = "primary",

  className = "",

  ...props
}: Props) {
  return (
    <button
      className={`
        ${styles.button}
        ${styles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
