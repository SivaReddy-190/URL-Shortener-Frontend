import { create } from 'zustand';
import type { UrlResponseDto } from '../types/url';

interface LinkState {
  links: UrlResponseDto[];
  selectedLink: UrlResponseDto | null;
  setLinks: (links: UrlResponseDto[]) => void;
  addLink: (link: UrlResponseDto) => void;
  updateLink: (link: UrlResponseDto) => void;
  removeLink: (shortLink: string) => void;
  setSelectedLink: (link: UrlResponseDto | null) => void;
}

export const useLinkStore = create<LinkState>()((set) => ({
  links: [],
  selectedLink: null,

  setLinks: (links: UrlResponseDto[]) => set({ links }),

  addLink: (link: UrlResponseDto) =>
    set((state) => ({ links: [link, ...state.links] })),

  updateLink: (updated: UrlResponseDto) =>
    set((state) => ({
      links: state.links.map((l) =>
        l.shortLink === updated.shortLink ? updated : l,
      ),
    })),

  removeLink: (shortLink: string) =>
    set((state) => ({
      links: state.links.filter((l) => l.shortLink !== shortLink),
      selectedLink:
        state.selectedLink?.shortLink === shortLink ? null : state.selectedLink,
    })),

  setSelectedLink: (link: UrlResponseDto | null) =>
    set({ selectedLink: link }),
}));
