import React from 'react';
import { Link2 } from 'lucide-react';
import type { UrlResponseDto } from '../../types/url';
import LinkCard from './LinkCard';
import EmptyState from '../ui/EmptyState';

interface LinkListProps {
  links: UrlResponseDto[];
  onDelete: (shortLink: string) => void;
  onExtend: (link: UrlResponseDto) => void;
  onEmptyAction?: () => void;
}

export const LinkList: React.FC<LinkListProps> = ({
  links,
  onDelete,
  onExtend,
}) => {
  if (links.length === 0) {
    return (
      <EmptyState
        icon={<Link2 className="w-8 h-8" />}
        title="No shortened links yet"
        description="Paste a long URL above to create your first short link and start tracking real-time click analytics."
      />
    );
  }

  return (
    <div className="space-y-3">
      {links.map((link) => (
        <LinkCard
          key={link.shortLink}
          link={link}
          onDelete={onDelete}
          onExtend={onExtend}
        />
      ))}
    </div>
  );
};

export default LinkList;
