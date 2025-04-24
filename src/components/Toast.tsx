import "./Toast.css";
import { ReactNode } from "react";
import { CircleAlert, CircleCheck, CircleX, Info } from "lucide-react";
import { easeIn, motion } from "motion/react";

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
    <motion.div
      className={`toast toast--${variant}`}
      initial={{ opacity: 0, scale: 0.9, marginBottom: "-100px" }}
      animate={{ scale: 1, opacity: 1, marginBottom: "initial" }}
      transition={{ ease: easeIn }}
    >
      <span>
        {icons[variant]} {children}
      </span>
    </motion.div>
  );
};

export default Toast;
