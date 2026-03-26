import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly label?: string;
  readonly error?: string;
  readonly helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-charcoal"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`rounded-md border px-3 py-2 text-sm text-charcoal placeholder:text-charcoal-muted transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
          error
            ? "border-error focus:ring-error"
            : "border-sand focus:ring-green"
        } ${className}`}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={
          error
            ? `${inputId}-error`
            : helperText
              ? `${inputId}-helper`
              : undefined
        }
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-error" role="alert">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={`${inputId}-helper`} className="text-xs text-charcoal-muted">
          {helperText}
        </p>
      )}
    </div>
  );
}
