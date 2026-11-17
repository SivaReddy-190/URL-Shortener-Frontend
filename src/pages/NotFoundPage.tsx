import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-ivory dark:bg-brand-charcoal text-brand-text-primary dark:text-white transition-colors">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md mx-auto space-y-5">
          <div className="inline-flex p-4 rounded-3xl bg-brand-rose/10 text-brand-rose mb-2">
            <Compass className="w-12 h-12" />
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight">404</h1>
          <h2 className="text-xl font-bold">Page Not Found</h2>
          <p className="text-sm text-brand-slate-muted dark:text-gray-400">
            The page or dashboard you are looking for does not exist or has been moved.
          </p>

          <div className="pt-3">
            <Link to="/">
              <Button
                variant="primary"
                size="md"
                icon={<Home className="w-4 h-4" />}
              >
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
