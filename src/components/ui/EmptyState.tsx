import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 bg-white/40 dark:bg-brand-slate/40">
      <div className="p-4 rounded-full bg-brand-emerald/10 text-brand-emerald mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-brand-text-primary dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-sm text-brand-slate-muted dark:text-gray-400 max-w-sm mb-6">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
