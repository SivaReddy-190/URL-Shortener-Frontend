import React, { useEffect, useState } from 'react';
import Card from './Card';

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  hint?: string;
  accentColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  hint,
  accentColor = 'text-brand-emerald bg-brand-emerald/10',
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (end === 0) {
      setDisplayValue(0);
      return;
    }
    const duration = 600; // ms
    const incrementTime = 20;
    const steps = duration / incrementTime;
    const stepValue = Math.ceil(end / steps);

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <Card hover className="relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-slate-muted dark:text-gray-400">
            {label}
          </p>
          <h4 className="text-3xl font-extrabold text-brand-text-primary dark:text-white mt-1">
            {displayValue.toLocaleString()}
          </h4>
          {hint && (
            <p className="text-xs text-brand-slate-muted dark:text-gray-400 mt-1">
              {hint}
            </p>
          )}
        </div>
        <div className={`p-3.5 rounded-2xl ${accentColor} shrink-0`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
