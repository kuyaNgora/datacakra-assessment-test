import React from "react";

// Define the types for the Layout props
interface InputProps {
  label?: string;
  htmlFor?: string;
  inputName?: string;
  className?: string;
  autoComplete?: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  htmlFor,
  inputName,
  className,
  autoComplete,
  type,
  ...rest
}) => {
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      <div>
        <input
          name={inputName}
          type={type}
          autoComplete={autoComplete}
          {...rest}
        />
      </div>
    </div>
  );
};

export default Input;
