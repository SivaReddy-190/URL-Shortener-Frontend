import React from 'react';
import { Smartphone, Globe2, Cpu, MapPin } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import type { DashboardResponse } from '../../types/analytics';
import ClicksSummaryBar from './ClicksSummaryBar';
import ClicksTimeChart from './ClicksTimeChart';
import BreakdownPie from './BreakdownPie';
import ReferrerTable from './ReferrerTable';
import Card from '../ui/Card';

interface DashboardGridProps {
  dashboard: DashboardResponse;
  activeRange: '24h' | '7d' | '30d';
  onRangeChange: (range: '24h' | '7d' | '30d') => void;
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({
  dashboard,
  activeRange,
  onRangeChange,
}) => {
  return (
    <div className="space-y-6">
      {/* 1. Summary Cards */}
      <ClicksSummaryBar summary={dashboard} />

      {/* 2. Clicks Over Time */}
      <ClicksTimeChart
        data={dashboard.clicksByDate}
        activeRange={activeRange}
        onRangeChange={onRangeChange}
      />

      {/* 3. Platform Breakdowns (Devices, Browsers, OS) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BreakdownPie
          title="Device Types"
          data={dashboard.deviceBreakdown}
          icon={<Smartphone className="w-4 h-4" />}
        />

        <BreakdownPie
          title="Web Browsers"
          data={dashboard.browserBreakdown}
          icon={<Globe2 className="w-4 h-4" />}
        />

        <BreakdownPie
          title="Operating Systems"
          data={dashboard.osBreakdown}
          icon={<Cpu className="w-4 h-4" />}
        />
      </div>

      {/* 4. Geographic & Referrer Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Countries Bar Chart */}
        <Card className="flex flex-col h-full">
          <div className="flex items-center gap-2 pb-3 mb-2 border-b border-gray-100 dark:border-gray-800">
            <div className="p-1.5 rounded-lg bg-brand-emerald/10 text-brand-emerald">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-brand-text-primary dark:text-white">
                Top Countries
              </h4>
              <p className="text-xs text-brand-slate-muted dark:text-gray-400">
                Visitor origins around the world
              </p>
            </div>
          </div>

          {dashboard.countryBreakdown.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-8 text-xs text-brand-slate-muted dark:text-gray-400">
              No geographical data recorded yet
            </div>
          ) : (
            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dashboard.countryBreakdown.slice(0, 6)}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: '#64748B' }}
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '0.75rem',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                    }}
                    formatter={(val: unknown) => [
                      `${Number(val).toLocaleString()} clicks`,
                      'Traffic',
                    ]}
                  />
                  <Bar
                    dataKey="clicks"
                    fill="#10B981"
                    radius={[0, 8, 8, 0]}
                    barSize={16}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        {/* Top Referrers */}
        <ReferrerTable data={dashboard.topReferrers} />
      </div>
    </div>
  );
};

export default DashboardGrid;
