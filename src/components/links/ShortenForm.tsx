import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Link2, SlidersHorizontal, Rocket, Calendar, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '../../stores/authStore';
import { generateShortLink } from '../../api/urls';
import type { UrlResponseDto } from '../../types/url';
import Input from '../ui/Input';
import Button from '../ui/Button';

const shortenSchema = z.object({
  url: z
    .string()
    .min(1, 'Please enter a URL')
    .regex(/^https?:\/\/.+/, 'URL must start with http:// or https://'),
  shortLink: z
    .string()
    .optional()
    .refine(
      (val) => !val || (val.length >= 3 && val.length <= 14 && /^[a-zA-Z0-9_-]+$/.test(val)),
      {
        message: 'Alias must be 3-14 chars (letters, numbers, hyphens, underscores)',
      },
    ),
  expirationDays: z.string().optional(),
});

type ShortenFormData = z.infer<typeof shortenSchema>;

interface ShortenFormProps {
  onSuccess?: (result: UrlResponseDto) => void;
  compact?: boolean;
  initialValues?: {
    url?: string;
    shortLink?: string;
    expirationDays?: number;
  };
}

export const ShortenForm: React.FC<ShortenFormProps> = ({
  onSuccess,
  compact = false,
  initialValues,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ShortenFormData>({
    resolver: zodResolver(shortenSchema),
    defaultValues: {
      url: initialValues?.url || '',
      shortLink: initialValues?.shortLink || '',
      expirationDays: initialValues?.expirationDays ? String(initialValues.expirationDays) : '',
    },
  });

  const onSubmit = async (data: ShortenFormData) => {
    // Auth-on-submit check
    if (!isAuthenticated) {
      toast.info('Please sign in or create an account to create your short link.');
      sessionStorage.setItem(
        'pendingShorten',
        JSON.stringify({
          url: data.url,
          shortLink: data.shortLink,
          expirationDays: data.expirationDays ? Number(data.expirationDays) : undefined,
        }),
      );
      navigate('/login?redirect=/');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        url: data.url.trim(),
        shortLink: data.shortLink?.trim() || undefined,
        expirationDays: data.expirationDays ? Number(data.expirationDays) : undefined,
      };

      const result = await generateShortLink(payload);
      toast.success('Link shortened successfully!');
      reset();
      setShowAdvanced(false);
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err: unknown) {
      const errorMsg =
        // @ts-expect-error axios error payload check
        err?.response?.data?.message || 'Failed to shorten URL. Please try again.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`w-full rounded-3xl bg-white dark:bg-brand-slate shadow-xl shadow-black/5 dark:shadow-black/20 border border-gray-100 dark:border-gray-800 ${
        compact ? 'p-5 sm:p-6' : 'p-6 sm:p-10'
      }`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Main URL Input Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Paste your long link here (e.g. https://example.com/very/long/url)..."
              icon={<Link2 className="w-5 h-5 text-brand-emerald" />}
              error={errors.url?.message}
              className="py-3.5 text-base rounded-2xl"
              {...register('url')}
            />
          </div>

          <Button
            type="submit"
            variant="accent"
            size="lg"
            loading={loading}
            icon={<Rocket className="w-5 h-5" />}
            className="sm:px-8 py-3.5 rounded-2xl whitespace-nowrap shadow-md shadow-orange-500/20"
          >
            Shorten
          </Button>
        </div>

        {/* Toggle Advanced Options */}
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-slate-muted dark:text-gray-400 hover:text-brand-emerald dark:hover:text-brand-emerald transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{showAdvanced ? 'Hide options' : 'Customize alias & expiry'}</span>
          </button>

          {!isAuthenticated && (
            <span className="text-xs text-brand-slate-muted dark:text-gray-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-brand-amber" />
              Free accounts save click analytics
            </span>
          )}
        </div>

        {/* Expandable Advanced Options */}
        {showAdvanced && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-gray-100 dark:border-gray-800 animate-slide-up">
            <Input
              label="Custom Alias (Optional)"
              placeholder="my-custom-link"
              hint="3-14 characters (letters, numbers, hyphens, underscores)"
              error={errors.shortLink?.message}
              {...register('shortLink')}
            />

            <div className="space-y-1.5 text-left">
              <label
                htmlFor="expirationDays"
                className="block text-sm font-medium text-brand-text-primary dark:text-gray-200"
              >
                Expiration (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-slate-muted">
                  <Calendar className="w-4 h-4" />
                </div>
                <select
                  id="expirationDays"
                  className="block w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-brand-slate py-2.5 pl-10 pr-3.5 text-sm text-brand-text-primary dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-emerald/20 focus:border-brand-emerald transition-all"
                  {...register('expirationDays')}
                >
                  <option value="">Never expires</option>
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ShortenForm;
