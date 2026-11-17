import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  Copy,
  Check,
  BarChart3,
  ExternalLink,
  Zap,
  ShieldCheck,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '../stores/authStore';
import { generateShortLink } from '../api/urls';
import type { UrlResponseDto } from '../types/url';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ShortenForm from '../components/links/ShortenForm';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const [createdLink, setCreatedLink] = useState<UrlResponseDto | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [pendingFormValues, setPendingFormValues] = useState<{
    url: string;
    shortLink?: string;
    expirationDays?: number;
  } | null>(null);

  // Resume pending shortening if user just logged in or registered
  useEffect(() => {
    const rawPending = sessionStorage.getItem('pendingShorten');
    if (rawPending) {
      try {
        const parsed = JSON.parse(rawPending);
        if (isAuthenticated && parsed.url) {
          sessionStorage.removeItem('pendingShorten');
          // Automatically shorten the link
          generateShortLink({
            url: parsed.url,
            shortLink: parsed.shortLink || undefined,
            expirationDays: parsed.expirationDays ? Number(parsed.expirationDays) : undefined,
          })
            .then((result) => {
              setCreatedLink(result);
              toast.success('Your link was shortened automatically!');
            })
            .catch((err) => {
              // If auto-shorten fails, restore form values so user can retry
              setPendingFormValues(parsed);
              const msg =
                err?.response?.data?.message || 'Failed to auto-shorten link';
              toast.error(msg);
            });
        } else {
          setPendingFormValues(parsed);
        }
      } catch {
        sessionStorage.removeItem('pendingShorten');
      }
    }
  }, [isAuthenticated]);

  const handleCopy = () => {
    setCopied(true);
    toast.success('Short link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const fullShortUrl = createdLink
    ? `${window.location.origin}/${createdLink.shortLink}`
    : '';

  return (
    <div className="min-h-screen flex flex-col bg-brand-ivory dark:bg-brand-charcoal text-brand-text-primary dark:text-white transition-colors">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-brand-emerald/15 to-brand-coral/10 blur-[100px] -z-10 pointer-events-none rounded-full" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-emerald/10 text-brand-emerald text-xs font-bold tracking-wide uppercase mb-6 animate-fade-in">
              <Zap className="w-3.5 h-3.5" />
              <span>Lightning Fast In-Memory Buffering</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 max-w-3xl mx-auto text-brand-text-primary dark:text-white">
              Shorten Any Link,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald via-emerald-500 to-brand-coral">
                Track Every Click.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-brand-slate-muted dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Create clean, trackable short URLs in seconds. Monitor real-time
              device breakdowns, geographic locations, and top referrer domains
              without privacy-invasive trackers.
            </p>

            {/* URL Shorten Form Card */}
            <div className="max-w-3xl mx-auto">
              <ShortenForm
                onSuccess={(result) => setCreatedLink(result)}
                initialValues={pendingFormValues || undefined}
              />
            </div>

            {/* Generated Short Link Result Card */}
            {createdLink && (
              <div className="max-w-3xl mx-auto mt-6 animate-slide-up">
                <Card className="border-2 border-brand-emerald/40 bg-white/95 dark:bg-brand-slate/95 p-6 shadow-xl">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-left space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-xs font-semibold text-brand-emerald">
                        <Check className="w-4 h-4" />
                        <span>Link ready to share!</span>
                      </div>
                      <a
                        href={fullShortUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-lg font-bold text-brand-text-primary dark:text-white hover:text-brand-emerald inline-flex items-center gap-1.5 truncate max-w-full"
                      >
                        <span>{fullShortUrl}</span>
                        <ExternalLink className="w-4 h-4 text-brand-slate-muted" />
                      </a>
                      <p className="text-xs text-brand-slate-muted dark:text-gray-400 truncate">
                        Redirects to: {createdLink.originalUrl}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                      <CopyToClipboard text={fullShortUrl} onCopy={handleCopy}>
                        <Button
                          variant="accent"
                          size="md"
                          fullWidth
                          icon={
                            copied ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )
                          }
                        >
                          {copied ? 'Copied!' : 'Copy Link'}
                        </Button>
                      </CopyToClipboard>

                      <Link to={`/analytics/${createdLink.shortLink}`}>
                        <Button
                          variant="outline"
                          size="md"
                          icon={<BarChart3 className="w-4 h-4 text-brand-emerald" />}
                        >
                          Analytics
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="py-16 border-t border-gray-100 dark:border-gray-800 bg-white/40 dark:bg-brand-slate/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-text-primary dark:text-white">
                Engineered for Speed and Precision
              </h2>
              <p className="mt-2 text-sm text-brand-slate-muted dark:text-gray-400">
                Behind every redirect is a resilient two-tier caching and batching architecture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Card hover className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-emerald/10 text-brand-emerald flex items-center justify-center font-bold">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-text-primary dark:text-white">
                  Sub-Millisecond Redirects
                </h3>
                <p className="text-sm text-brand-slate-muted dark:text-gray-400 leading-relaxed">
                  Redis in-memory click buffering ensures that redirection happens immediately without waiting for database writes.
                </p>
              </Card>

              {/* Feature 2 */}
              <Card hover className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-coral/10 text-brand-coral flex items-center justify-center font-bold">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-text-primary dark:text-white">
                  Rich Click Telemetry
                </h3>
                <p className="text-sm text-brand-slate-muted dark:text-gray-400 leading-relaxed">
                  Extracts HTTP Referer domains, client device types, browsers, OS versions, and geolocations asynchronously in batches.
                </p>
              </Card>

              {/* Feature 3 */}
              <Card hover className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-violet/10 text-brand-violet flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-text-primary dark:text-white">
                  Secure & Granular Access
                </h3>
                <p className="text-sm text-brand-slate-muted dark:text-gray-400 leading-relaxed">
                  Stateless JWT authentication guards your analytics dashboards, custom alias reservation, and deletion controls.
                </p>
              </Card>
            </div>

            {/* CTA Banner */}
            <div className="mt-16 rounded-3xl bg-gradient-to-r from-brand-emerald to-brand-emerald-deep p-8 sm:p-12 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-2xl sm:text-3xl font-extrabold">
                  Ready to manage your links?
                </h3>
                <p className="text-emerald-100 text-sm max-w-xl">
                  Sign up in seconds to start tracking all your short links in one unified dashboard.
                </p>
              </div>
              <Link to="/register">
                <Button
                  variant="accent"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                  className="whitespace-nowrap px-8 py-3.5 shadow-lg shadow-black/20"
                >
                  Create Free Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
