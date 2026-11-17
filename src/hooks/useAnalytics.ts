import { useState, useEffect } from 'react';
import { getDashboard } from '../api/analytics';
import type { DashboardResponse } from '../types/analytics';

interface UseAnalyticsResult {
  dashboard: DashboardResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useAnalytics(shortLink: string, days: number = 30): UseAnalyticsResult {
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    if (!shortLink) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getDashboard(shortLink, days);
      setDashboard(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch analytics data';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortLink, days]);

  return {
    dashboard,
    loading,
    error,
    refetch: fetchDashboard,
  };
}
