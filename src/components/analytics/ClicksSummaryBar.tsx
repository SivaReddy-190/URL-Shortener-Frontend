import React from 'react';
import { MousePointerClick, Clock, Calendar, TrendingUp } from 'lucide-react';
import type { ClicksSummaryResponse } from '../../types/analytics';
import StatCard from '../ui/StatCard';

interface ClicksSummaryBarProps {
  summary: ClicksSummaryResponse;
}

export const ClicksSummaryBar: React.FC<ClicksSummaryBarProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Total Clicks"
        value={summary.totalClicks}
        icon={<MousePointerClick className="w-6 h-6" />}
        accentColor="text-brand-emerald bg-brand-emerald/10"
        hint="All-time accumulated"
      />

      <StatCard
        label="Last 24 Hours"
        value={summary.clicksLast24h}
        icon={<Clock className="w-6 h-6" />}
        accentColor="text-brand-coral bg-brand-coral/10"
        hint="Recent real-time activity"
      />

      <StatCard
        label="Last 7 Days"
        value={summary.clicksLast7d}
        icon={<Calendar className="w-6 h-6" />}
        accentColor="text-brand-amber bg-brand-amber/10"
        hint="Weekly engagement"
      />

      <StatCard
        label="Last 30 Days"
        value={summary.clicksLast30d}
        icon={<TrendingUp className="w-6 h-6" />}
        accentColor="text-brand-violet bg-brand-violet/10"
        hint="Monthly traffic trend"
      />
    </div>
  );
};

export default ClicksSummaryBar;
