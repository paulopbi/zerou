import { ButtonHTMLAttributes } from "react";
import "./Button.css";

type ButtonProps = {
  variant?: "default" | "ghost" | "danger" | "success";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ variant = "default", children, ...props }: ButtonProps) => {
  return (
    <button className={`button button--${variant}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
