import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  shortLink: string;
  loading?: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  shortLink,
  loading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Short Link">
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-brand-rose/10 text-brand-rose">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-rose-700 dark:text-brand-rose">
              Are you sure you want to delete this link?
            </p>
            <p className="mt-1 text-xs text-rose-600/90 dark:text-rose-300">
              Anyone visiting{' '}
              <span className="font-mono font-bold">/{shortLink}</span> will no
              longer be redirected. All associated click analytics will also be
              removed.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2">
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
            variant="danger"
            onClick={onConfirm}
            loading={loading}
          >
            Delete Link
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
