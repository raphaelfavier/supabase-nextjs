import React from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  disabled?: boolean;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  autoComplete,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        disabled={disabled}
        className={`w-full px-3 py-2 border border-[#ccc] rounded ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        } ${className}`}

        {...props}
      />
    </div>
  );
};

export default FormField;
