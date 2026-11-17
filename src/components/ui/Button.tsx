import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'accent' | 'danger' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-brand-emerald text-white hover:bg-brand-emerald-dark focus:ring-brand-emerald shadow-sm shadow-emerald-500/20 active:scale-[0.98]',
    accent:
      'bg-brand-coral text-white hover:bg-brand-coral-dark focus:ring-brand-coral shadow-sm shadow-orange-500/20 active:scale-[0.98]',
    danger:
      'bg-brand-rose text-white hover:bg-rose-600 focus:ring-brand-rose active:scale-[0.98]',
    ghost:
      'bg-transparent text-brand-text-primary dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 focus:ring-brand-emerald',
    outline:
      'bg-transparent border border-gray-300 dark:border-gray-700 text-brand-text-primary dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 focus:ring-brand-emerald',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        icon && <span className="inline-flex shrink-0">{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
};

export default Button;
