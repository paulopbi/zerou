import "./Alert.css";

interface IAlert {
  message: string;
  variant?: "warning" | "info" | "sucess";
  onlyText?: boolean;
}

const Alert = ({ message, variant, onlyText = false }: IAlert) => {
  if (variant === "warning") {
    return (
      <div
        className={
          onlyText ? "alert-warning--only-text" : "alert--badge alert--warning"
        }
      >
        <p>{message}</p>
      </div>
    );
  }

  if (variant === "info") {
    return (
      <div
        className={
          onlyText ? "alert-info--only-text" : "alert--badge alert--info"
        }
      >
        <p>{message}</p>
      </div>
    );
  }

  if (variant === "sucess") {
    return (
      <div
        className={
          onlyText ? "alert-sucess--only-text" : "alert--badge alert--sucess"
        }
      >
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div
      className={
        onlyText ? "alert-danger--only-text" : "alert--badge alert--danger"
      }
    >
      <p>{message}</p>
    </div>
  );
};

export default Alert;
