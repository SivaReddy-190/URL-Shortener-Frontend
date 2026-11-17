import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  bordered?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  bordered = true,
  ...props
}) => {
  return (
    <div
      className={`rounded-2xl bg-white dark:bg-brand-slate text-brand-text-primary dark:text-gray-100 p-6 transition-all duration-200 ${
        bordered ? 'border border-gray-100 dark:border-gray-800' : ''
      } ${
        hover
          ? 'hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 hover:-translate-y-0.5'
          : 'shadow-xs'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
