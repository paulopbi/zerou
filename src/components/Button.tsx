import { ButtonHTMLAttributes } from "react";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "standard" | "ghost" | "danger" | "success";
}

export default function Button({
  variant = "standard",
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={`button button--${variant}`} {...props}>
      {children}
    </button>
  );
}
