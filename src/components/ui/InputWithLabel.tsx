import React from "react";

interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | undefined;
}

const InputWithLabel = ({ label, error, ...props }: InputWithLabelProps) => {
  return (
    <React.Fragment>
      <label htmlFor={props.id} className="label">
        {label}
      </label>
      <input {...props} />
      {error && <span className="error">{error}</span>}
    </React.Fragment>
  );
};

export default InputWithLabel;
