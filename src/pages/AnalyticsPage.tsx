import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { getDashboard, getClicksByDate, getClicksByHour } from '../api/analytics';
import type { DashboardResponse } from '../types/analytics';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DashboardGrid from '../components/analytics/DashboardGrid';
import Spinner from '../components/ui/Spinner';
import Button from '../components/ui/Button';

export const AnalyticsPage: React.FC = () => {
  const { shortLink } = useParams<{ shortLink: string }>();
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeRange, setActiveRange] = useState<'24h' | '7d' | '30d'>('30d');

  const fetchFullDashboard = async () => {
    if (!shortLink) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getDashboard(shortLink, 30);
      setDashboard(data);
    } catch (err: unknown) {
      const msg =
        // @ts-expect-error axios error payload check
        err?.response?.data?.message || 'Failed to load analytics dashboard';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFullDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortLink]);

  const handleRangeChange = async (range: '24h' | '7d' | '30d') => {
    setActiveRange(range);
    if (!shortLink || !dashboard) return;

    try {
      if (range === '24h') {
        const points = await getClicksByHour(shortLink, 24);
        setDashboard({ ...dashboard, clicksByDate: points });
      } else if (range === '7d') {
        const points = await getClicksByDate(shortLink, 7);
        setDashboard({ ...dashboard, clicksByDate: points });
      } else {
        const points = await getClicksByDate(shortLink, 30);
        setDashboard({ ...dashboard, clicksByDate: points });
      }
    } catch {
      toast.error('Failed to update timeline chart');
    }
  };

  const fullShortUrl = shortLink ? `${window.location.origin}/${shortLink}` : '';

  return (
    <div className="min-h-screen flex flex-col bg-brand-ivory dark:bg-brand-charcoal text-brand-text-primary dark:text-white transition-colors">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-slate-muted dark:text-gray-400 hover:text-brand-emerald transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>

            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-brand-emerald">
                /{shortLink}
              </h1>

              {fullShortUrl && (
                <a
                  href={fullShortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-brand-slate-muted hover:text-brand-text-primary dark:hover:text-white transition-colors"
                  title="Test redirect"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            {dashboard && (
              <p
                className="text-xs text-brand-slate-muted dark:text-gray-400 truncate max-w-xl"
                title={dashboard.originalUrl}
              >
                Target URL: {dashboard.originalUrl}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchFullDashboard}
              icon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />}
              disabled={loading}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Content Body */}
        {loading && !dashboard ? (
          <div className="py-24">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-brand-rose/20 bg-brand-rose/5 p-12 text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-brand-rose mx-auto" />
            <h3 className="text-lg font-bold text-brand-text-primary dark:text-white">
              Unable to load link analytics
            </h3>
            <p className="text-sm text-brand-slate-muted dark:text-gray-400 max-w-md mx-auto">
              {error}
            </p>
            <div className="pt-2">
              <Link to="/dashboard">
                <Button variant="primary" size="md">
                  Return to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        ) : dashboard ? (
          <DashboardGrid
            dashboard={dashboard}
            activeRange={activeRange}
            onRangeChange={handleRangeChange}
          />
        ) : null}
      </main>

      <Footer />
    </div>
  );
};

export default AnalyticsPage;
