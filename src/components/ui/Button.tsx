import React from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "danger" | "sucess";
  children: React.ReactNode;
}

const Button = ({ variant = "default", children, ...props }: IButtonProps) => {
  if (variant === "default")
    return (
      <button className="btn btn-primary" {...props}>
        {children}
      </button>
    );

  if (variant === "ghost") {
    return (
      <button className="btn btn-ghost" {...props}>
        {children}
      </button>
    );
  }
  if (variant === "danger") {
    return (
      <button className="btn btn-danger" {...props}>
        {children}
      </button>
    );
  }

  if (variant === "sucess") {
    return (
      <button className="btn btn-sucess" {...props}>
        {children}
      </button>
    );
  }
};

export default Button;
