import "./Toast.css";
import { ReactNode } from "react";
import { CircleAlert, CircleCheck, CircleX, Info } from "lucide-react";

type ToastPropsType = {
  children: ReactNode;
  variant: "success" | "danger" | "info" | "warning";
};

const Toast = ({ children, variant = "success" }: ToastPropsType) => {
  const icons = {
    success: <CircleCheck />,
    danger: <CircleX />,
    info: <Info />,
    warning: <CircleAlert />,
  };

  return (
    <div className={`toast toast--${variant}`}>
      <span>
        {icons[variant]} {children}
      </span>
    </div>
  );
};

export default Toast;
