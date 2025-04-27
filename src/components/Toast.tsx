import "./Toast.css";
import { ReactNode } from "react";
import { CircleAlert, CircleCheck, CircleX, Info } from "lucide-react";
import { motion } from "motion/react";

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

  const toastVariants = {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  return (
    <motion.div
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "tween", ease: "easeInOut" }}
      className={`toast toast--${variant}`}
    >
      <span>
        {icons[variant]} {children}
      </span>
    </motion.div>
  );
};

export default Toast;
