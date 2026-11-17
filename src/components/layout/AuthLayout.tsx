import React from 'react';
import { Link } from 'react-router-dom';
import { Link2 } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-brand-ivory via-white to-brand-ivory dark:from-brand-charcoal dark:via-[#161f30] dark:to-brand-charcoal transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 group mb-6">
          <div className="p-2.5 rounded-2xl bg-brand-emerald text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Link2 className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-brand-text-primary dark:text-white">
            Snip<span className="text-brand-emerald">link</span>
          </span>
        </Link>
        <h2 className="text-3xl font-extrabold tracking-tight text-brand-text-primary dark:text-white">
          {title}
        </h2>
        <p className="mt-2 text-sm text-brand-slate-muted dark:text-gray-400">
          {subtitle}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white dark:bg-brand-slate py-8 px-6 sm:px-10 shadow-xl shadow-black/5 dark:shadow-black/20 rounded-3xl border border-gray-100 dark:border-gray-800">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
