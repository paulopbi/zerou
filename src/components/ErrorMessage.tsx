const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div>
      <span className="error">{message}</span>
    </div>
  );
};

export default ErrorMessage;
