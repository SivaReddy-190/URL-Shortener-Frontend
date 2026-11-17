import React from 'react';
import { Link2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-brand-charcoal/50 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-slate-muted dark:text-gray-400">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-brand-emerald text-white">
            <Link2 className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-sm text-brand-text-primary dark:text-white">
            Sniplink
          </span>
          <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="/swagger-ui.html"
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand-emerald transition-colors"
          >
            Swagger API Docs
          </a>
          <span className="inline-block w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
          <span>High Performance Spring Boot + Redis</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
