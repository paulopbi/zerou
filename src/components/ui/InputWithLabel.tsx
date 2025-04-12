import React from "react";

interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputWithLabel = ({ label, ...props }: InputWithLabelProps) => {
  return (
    <React.Fragment>
      <label htmlFor={props.id} className="label">
        {label}
      </label>
      <input {...props} />
    </React.Fragment>
  );
};

export default InputWithLabel;
