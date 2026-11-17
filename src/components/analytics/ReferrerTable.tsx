import React from 'react';
import { Globe, Compass } from 'lucide-react';
import type { BreakdownEntry } from '../../types/analytics';
import Card from '../ui/Card';

interface ReferrerTableProps {
  data: BreakdownEntry[];
  title?: string;
}

export const ReferrerTable: React.FC<ReferrerTableProps> = ({
  data,
  title = 'Top Referrers',
}) => {
  const maxClicks = Math.max(...data.map((d) => d.clicks), 1);
  const totalClicks = data.reduce((acc, curr) => acc + curr.clicks, 0);

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center gap-2 pb-3 mb-2 border-b border-gray-100 dark:border-gray-800">
        <div className="p-1.5 rounded-lg bg-brand-coral/10 text-brand-coral">
          <Compass className="w-4 h-4" />
        </div>
        <div>
          <h4 className="font-bold text-sm text-brand-text-primary dark:text-white">
            {title}
          </h4>
          <p className="text-xs text-brand-slate-muted dark:text-gray-400">
            Websites sending traffic to your short link
          </p>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-8 text-xs text-brand-slate-muted dark:text-gray-400">
          No referrer sources recorded yet (all traffic is direct or privacy-restricted)
        </div>
      ) : (
        <div className="space-y-3 pt-2">
          {data.map((entry) => {
            const isDirect = !entry.name || entry.name === 'Direct' || entry.name === 'null';
            const domainName = isDirect ? 'Direct / Bookmarks' : entry.name;
            const pct = totalClicks > 0 ? ((entry.clicks / totalClicks) * 100).toFixed(1) : '0';
            const barWidth = Math.round((entry.clicks / maxClicks) * 100);

            return (
              <div key={entry.name || 'direct'} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    {isDirect ? (
                      <Globe className="w-4 h-4 text-brand-slate-muted shrink-0" />
                    ) : (
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${entry.name}&sz=32`}
                        alt=""
                        className="w-4 h-4 rounded-xs shrink-0"
                        onError={(e) => {
                          // Fallback to globe icon
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    )}
                    <span className="font-medium text-brand-text-primary dark:text-gray-200 truncate">
                      {domainName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs shrink-0">
                    <span className="font-bold text-brand-text-primary dark:text-white">
                      {entry.clicks.toLocaleString()}
                    </span>
                    <span className="text-brand-slate-muted dark:text-gray-400 text-[10px]">
                      ({pct}%)
                    </span>
                  </div>
                </div>

                {/* Relative progress bar */}
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-brand-emerald h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default ReferrerTable;
