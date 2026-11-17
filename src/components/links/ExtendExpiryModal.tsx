import React, { useState } from 'react';
import { CalendarPlus, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow, isPast, format } from 'date-fns';
import { extendExpiry } from '../../api/urls';
import { useLinkStore } from '../../stores/linkStore';
import type { UrlResponseDto } from '../../types/url';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

interface ExtendExpiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  link: UrlResponseDto | null;
}

export const ExtendExpiryModal: React.FC<ExtendExpiryModalProps> = ({
  isOpen,
  onClose,
  link,
}) => {
  const { updateLink } = useLinkStore();
  const [selectedDays, setSelectedDays] = useState<number>(30);
  const [customDays, setCustomDays] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  if (!link) return null;

  const currentExpiry = link.expirationTime ? new Date(link.expirationTime) : null;
  const isExpired = currentExpiry ? isPast(currentExpiry) : false;

  const handleConfirm = async () => {
    const days = customDays ? parseInt(customDays, 10) : selectedDays;
    if (isNaN(days) || days <= 0) {
      toast.error('Please enter a valid number of days');
      return;
    }

    setLoading(true);
    try {
      const updated = await extendExpiry(link.shortLink, days);
      updateLink(updated);
      toast.success(
        `Link expiration extended by ${days} days!`,
      );
      onClose();
    } catch (err: unknown) {
      // @ts-expect-error axios response data check
      const msg = err?.response?.data?.message || err?.message || 'Failed to extend link expiration';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const presetOptions = [7, 14, 30, 60, 90];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Extend Expiration Date">
      <div className="space-y-4">
        {/* Info Box */}
        <div className="p-3.5 rounded-xl bg-brand-emerald/10 text-brand-text-primary dark:text-gray-200 text-sm space-y-1">
          <div className="flex items-center gap-2 font-mono font-bold text-brand-emerald">
            <CalendarPlus className="w-4 h-4" />
            <span>/{link.shortLink}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-brand-slate-muted dark:text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {currentExpiry
                ? isExpired
                  ? 'Expired — extending will reactivate it from today.'
                  : `Currently expires ${formatDistanceToNow(currentExpiry, { addSuffix: true })} (${format(currentExpiry, 'dd/MM/yyyy')})`
                : 'Currently set to never expire.'}
            </span>
          </div>
        </div>

        {/* Preset Days Grid */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-slate-muted dark:text-gray-400">
            Add Additional Days:
          </label>
          <div className="grid grid-cols-5 gap-2">
            {presetOptions.map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => {
                  setSelectedDays(days);
                  setCustomDays('');
                }}
                className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  selectedDays === days && !customDays
                    ? 'border-brand-emerald bg-brand-emerald text-white shadow-xs'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-brand-slate text-brand-text-primary dark:text-gray-200 hover:border-brand-emerald/50'
                }`}
              >
                +{days}d
              </button>
            ))}
          </div>
        </div>

        {/* Custom Days Input */}
        <div className="space-y-1.5">
          <label
            htmlFor="customDays"
            className="block text-xs font-semibold uppercase tracking-wider text-brand-slate-muted dark:text-gray-400"
          >
            Or Custom Days:
          </label>
          <input
            id="customDays"
            type="number"
            min="1"
            max="365"
            placeholder="e.g. 45"
            value={customDays}
            onChange={(e) => {
              setCustomDays(e.target.value);
            }}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-brand-slate py-2 px-3 text-sm text-brand-text-primary dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-emerald/20 focus:border-brand-emerald"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 dark:border-gray-800">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={handleConfirm}
            loading={loading}
          >
            Extend Expiration
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ExtendExpiryModal;
