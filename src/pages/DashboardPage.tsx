import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Link2, RefreshCw } from 'lucide-react';
import { getMyLinks, deleteLink } from '../api/urls';
import { useLinkStore } from '../stores/linkStore';
import type { UrlResponseDto } from '../types/url';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ShortenForm from '../components/links/ShortenForm';
import LinkList from '../components/links/LinkList';
import DeleteConfirmModal from '../components/links/DeleteConfirmModal';
import ExtendExpiryModal from '../components/links/ExtendExpiryModal';
import Spinner from '../components/ui/Spinner';
import Button from '../components/ui/Button';

export const DashboardPage: React.FC = () => {
  const { links, setLinks, addLink, removeLink } = useLinkStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [deletingShortLink, setDeletingShortLink] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [extendingLink, setExtendingLink] = useState<UrlResponseDto | null>(null);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const data = await getMyLinks();
      setLinks(data);
    } catch {
      toast.error('Failed to load your shortened links');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deletingShortLink) return;

    setDeleteLoading(true);
    try {
      await deleteLink(deletingShortLink);
      removeLink(deletingShortLink);
      toast.success('Short link deleted');
      setDeletingShortLink(null);
    } catch {
      toast.error('Failed to delete short link');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-ivory dark:bg-brand-charcoal text-brand-text-primary dark:text-white transition-colors">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm text-brand-slate-muted dark:text-gray-400 mt-1">
              Create, monitor, and manage your shortened URLs
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={fetchLinks}
            icon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />}
            disabled={loading}
          >
            Refresh
          </Button>
        </div>

        {/* Shorten Link Box (Compact Mode) */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-slate-muted dark:text-gray-400 mb-3 flex items-center gap-1.5">
            <Link2 className="w-4 h-4 text-brand-emerald" />
            <span>Shorten New URL</span>
          </h2>
          <ShortenForm
            compact
            onSuccess={(newLink) => {
              addLink(newLink);
            }}
          />
        </div>

        {/* Links List Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold">Your Short Links</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-emerald/10 text-brand-emerald">
                {links.length}
              </span>
            </div>
          </div>

          {loading ? (
            <div className="py-12">
              <Spinner size="lg" />
            </div>
          ) : (
            <LinkList
              links={links}
              onDelete={(shortLink) => setDeletingShortLink(shortLink)}
              onExtend={(link) => setExtendingLink(link)}
            />
          )}
        </div>
      </main>

      <Footer />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingShortLink}
        shortLink={deletingShortLink || ''}
        loading={deleteLoading}
        onClose={() => setDeletingShortLink(null)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Extend Expiration Modal */}
      <ExtendExpiryModal
        isOpen={!!extendingLink}
        link={extendingLink}
        onClose={() => setExtendingLink(null)}
      />
    </div>
  );
};

export default DashboardPage;
