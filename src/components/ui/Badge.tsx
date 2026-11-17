import React from 'react';

export type BadgeVariant = 'success' | 'danger' | 'warning' | 'info' | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  children,
  className = '',
}) => {
  const variantStyles = {
    success:
      'bg-brand-mint/15 text-emerald-700 dark:text-brand-mint border-brand-mint/30',
    danger:
      'bg-brand-rose/15 text-rose-700 dark:text-brand-rose border-brand-rose/30',
    warning:
      'bg-brand-amber/15 text-amber-700 dark:text-brand-amber border-brand-amber/30',
    info: 'bg-brand-emerald/15 text-brand-emerald-dark dark:text-brand-emerald border-brand-emerald/30',
    neutral:
      'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
