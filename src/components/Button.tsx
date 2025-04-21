import { ButtonHTMLAttributes, forwardRef } from "react";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "danger" | "success";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", children, ...props }, ref) => {
    return (
      <button className={`button button--${variant}`} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
