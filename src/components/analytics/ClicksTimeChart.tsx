import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import type { TimeSeriesPoint } from '../../types/analytics';
import Card from '../ui/Card';

interface ClicksTimeChartProps {
  data: TimeSeriesPoint[];
  title?: string;
  activeRange: '24h' | '7d' | '30d';
  onRangeChange: (range: '24h' | '7d' | '30d') => void;
}

export const ClicksTimeChart: React.FC<ClicksTimeChartProps> = ({
  data,
  title = 'Clicks Over Time',
  activeRange,
  onRangeChange,
}) => {
  const ranges: Array<'24h' | '7d' | '30d'> = ['24h', '7d', '30d'];

  return (
    <Card className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-brand-emerald/10 text-brand-emerald">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-brand-text-primary dark:text-white">
              {title}
            </h3>
            <p className="text-xs text-brand-slate-muted dark:text-gray-400">
              Interactive timeline of link visitors
            </p>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="inline-flex rounded-xl p-1 bg-gray-100 dark:bg-gray-800 self-start sm:self-auto">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => onRangeChange(r)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeRange === r
                  ? 'bg-white dark:bg-brand-slate text-brand-emerald dark:text-brand-emerald shadow-xs'
                  : 'text-brand-slate-muted dark:text-gray-400 hover:text-brand-text-primary dark:hover:text-white'
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="h-72 w-full pt-2">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-brand-slate-muted dark:text-gray-400">
            No click events recorded for this timeframe yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E2E8F0"
                className="opacity-40 dark:opacity-10"
              />

              <XAxis
                dataKey="timestamp"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: '#64748B' }}
                tickFormatter={(val: string) => {
                  if (activeRange === '24h') {
                    // Expecting HH:00 or ISO
                    return val.length > 5 ? val.slice(11, 16) : val;
                  }
                  // Date YYYY-MM-DD -> DD/MM
                  if (val && val.includes('-')) {
                    const parts = val.slice(0, 10).split('-');
                    if (parts.length === 3) {
                      return `${parts[2]}/${parts[1]}`;
                    }
                  }
                  return val;
                }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
                tick={{ fontSize: 11, fill: '#64748B' }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.75rem',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                }}
                labelStyle={{ fontWeight: 'bold', color: '#10B981', marginBottom: 2 }}
                labelFormatter={(label: unknown) => {
                  if (typeof label === 'string' && label.includes('-')) {
                    const parts = label.slice(0, 10).split('-');
                    if (parts.length === 3) {
                      return `${parts[2]}/${parts[1]}/${parts[0]}`;
                    }
                  }
                  return String(label ?? '');
                }}
                formatter={(value: unknown) => [
                  `${Number(value).toLocaleString()} clicks`,
                  'Traffic',
                ]}
              />

              <Area
                type="monotone"
                dataKey="clicks"
                stroke="#10B981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#emeraldGradient)"
                activeDot={{ r: 6, fill: '#F97316', stroke: '#FFFFFF', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};

export default ClicksTimeChart;
