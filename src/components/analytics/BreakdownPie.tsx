import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import type { BreakdownEntry } from '../../types/analytics';
import Card from '../ui/Card';

const CHART_COLORS = ['#10B981', '#F97316', '#FBBF24', '#A78BFA', '#F43F5E', '#34D399'];

interface BreakdownPieProps {
  data: BreakdownEntry[];
  title: string;
  icon?: React.ReactNode;
}

export const BreakdownPie: React.FC<BreakdownPieProps> = ({
  data,
  title,
  icon,
}) => {
  const total = data.reduce((acc, curr) => acc + curr.clicks, 0);

  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-center gap-2 pb-3 mb-2 border-b border-gray-100 dark:border-gray-800">
        {icon && (
          <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-brand-emerald">
            {icon}
          </div>
        )}
        <h4 className="font-bold text-sm text-brand-text-primary dark:text-white">
          {title}
        </h4>
      </div>

      {data.length === 0 || total === 0 ? (
        <div className="flex-1 flex items-center justify-center p-8 text-xs text-brand-slate-muted dark:text-gray-400">
          No data recorded yet
        </div>
      ) : (
        <div className="flex flex-col flex-1 justify-between">
          <div className="h-44 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="clicks"
                  nameKey="name"
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                      stroke="transparent"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.75rem',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
                  }}
                  formatter={(value: unknown, name: unknown) => {
                    const clicks = Number(value);
                    const pct = total > 0 ? ((clicks / total) * 100).toFixed(1) : '0';
                    return [`${clicks.toLocaleString()} clicks (${pct}%)`, String(name)];
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Total Count */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-brand-slate-muted dark:text-gray-400 font-medium">
                Total
              </span>
              <span className="text-base font-extrabold text-brand-text-primary dark:text-white">
                {total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Legend Items */}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs">
            {data.slice(0, 4).map((entry, idx) => {
              const pct = total > 0 ? Math.round((entry.clicks / total) * 100) : 0;
              return (
                <div key={entry.name} className="flex items-center gap-1.5 truncate">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }}
                  />
                  <span className="truncate text-brand-text-primary dark:text-gray-200" title={entry.name}>
                    {entry.name || 'Unknown'}
                  </span>
                  <span className="ml-auto text-brand-slate-muted dark:text-gray-400 font-mono text-[10px]">
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
};

export default BreakdownPie;
