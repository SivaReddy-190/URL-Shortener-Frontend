import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, hint, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-brand-text-primary dark:text-gray-200"
          >
            {label}
          </label>
        )}
        <div className="relative rounded-xl shadow-xs">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-slate-muted">
              {icon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`block w-full rounded-xl border bg-white dark:bg-brand-slate py-2.5 text-sm text-brand-text-primary dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
              icon ? 'pl-10 pr-3.5' : 'px-3.5'
            } ${
              error
                ? 'border-brand-rose focus:border-brand-rose focus:ring-brand-rose/20'
                : 'border-gray-200 dark:border-gray-700 focus:border-brand-emerald focus:ring-brand-emerald/20'
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-brand-rose font-medium mt-1 animate-fade-in">
            {error}
          </p>
        )}
        {!error && hint && (
          <p className="text-xs text-brand-slate-muted dark:text-gray-400 mt-1">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
export default Input;
