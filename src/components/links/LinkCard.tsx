import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  Copy,
  Check,
  BarChart3,
  Trash2,
  ExternalLink,
  MousePointerClick,
  Clock,
  CalendarPlus,
} from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow, isPast, format } from 'date-fns';
import { getStats } from '../../api/urls';
import type { UrlResponseDto } from '../../types/url';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface LinkCardProps {
  link: UrlResponseDto;
  onDelete: (shortLink: string) => void;
  onExtend: (link: UrlResponseDto) => void;
}

export const LinkCard: React.FC<LinkCardProps> = ({
  link,
  onDelete,
  onExtend,
}) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number | null>(null);

  const fullShortUrl = `${window.location.origin}/${link.shortLink}`;

  useEffect(() => {
    let isMounted = true;
    getStats(link.shortLink)
      .then((data) => {
        if (isMounted) setClickCount(data.clickCount);
      })
      .catch(() => {
        // Fallback gracefully
      });
    return () => {
      isMounted = false;
    };
  }, [link.shortLink]);

  const handleCopy = () => {
    setCopied(true);
    toast.success('Short link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const isExpired = link.expirationTime && isPast(new Date(link.expirationTime));

  const renderExpiryBadge = () => {
    if (!link.expirationTime) {
      return (
        <span
          onClick={() => onExtend(link)}
          className="cursor-pointer hover:opacity-80 transition-opacity"
          title="Click to set an expiration date"
        >
          <Badge variant="success">Never expires</Badge>
        </span>
      );
    }
    const expiryDate = new Date(link.expirationTime);
    if (isExpired) {
      return (
        <span
          onClick={() => onExtend(link)}
          className="cursor-pointer hover:opacity-80 transition-opacity"
          title="Click to extend and reactivate link"
        >
          <Badge variant="danger">Expired (Click to renew)</Badge>
        </span>
      );
    }
    return (
      <span
        onClick={() => onExtend(link)}
        className="cursor-pointer hover:opacity-80 transition-opacity"
        title="Click to extend expiration date"
      >
        <Badge variant="warning">
          Expires {formatDistanceToNow(expiryDate, { addSuffix: true })}
        </Badge>
      </span>
    );
  };

  return (
    <Card hover className="border-l-4 border-l-brand-emerald p-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* URL info */}
        <div className="space-y-1.5 min-w-0 flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href={fullShortUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono font-bold text-base text-brand-emerald hover:text-brand-emerald-dark inline-flex items-center gap-1.5 transition-colors"
            >
              <span>{fullShortUrl}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
            {renderExpiryBadge()}
          </div>

          <p
            className="text-xs text-brand-slate-muted dark:text-gray-400 truncate max-w-xl"
            title={link.originalUrl}
          >
            {link.originalUrl}
          </p>

          <div className="flex items-center gap-4 pt-1 text-xs text-brand-slate-muted dark:text-gray-400">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <MousePointerClick className="w-3.5 h-3.5 text-brand-emerald" />
              <strong className="text-brand-text-primary dark:text-gray-200">
                {clickCount !== null ? clickCount.toLocaleString() : '...'}
              </strong>{' '}
              clicks
            </span>

            {link.expirationTime && (
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {format(new Date(link.expirationTime), 'dd/MM/yyyy')}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 self-end lg:self-center flex-wrap">
          <CopyToClipboard text={fullShortUrl} onCopy={handleCopy}>
            <Button
              variant="outline"
              size="sm"
              icon={
                copied ? (
                  <Check className="w-4 h-4 text-brand-mint" />
                ) : (
                  <Copy className="w-4 h-4" />
                )
              }
              title="Copy short link"
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </CopyToClipboard>

          <Button
            variant="outline"
            size="sm"
            icon={<CalendarPlus className="w-4 h-4 text-brand-amber" />}
            onClick={() => onExtend(link)}
            title="Extend expiration date"
          >
            Extend
          </Button>

          <Button
            variant="outline"
            size="sm"
            icon={<BarChart3 className="w-4 h-4 text-brand-emerald" />}
            onClick={() => navigate(`/analytics/${link.shortLink}`)}
            title="View detailed analytics"
          >
            Analytics
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="text-brand-rose border-brand-rose/30 hover:bg-brand-rose/10 hover:border-brand-rose/50"
            icon={<Trash2 className="w-4 h-4 text-brand-rose" />}
            onClick={() => onDelete(link.shortLink)}
            title="Delete short link"
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LinkCard;
