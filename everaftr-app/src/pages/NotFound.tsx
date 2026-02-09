import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-6xl font-light text-accent-primary mb-4">404</h1>
        <h2 className="font-serif text-2xl text-text-primary mb-4">
          Page not found
        </h2>
        <p className="font-sans text-base font-light text-text-secondary mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-accent-primary text-text-on-dark font-sans text-sm tracking-wide rounded hover:bg-accent-primary-hover transition-colors"
          >
            Go Home
          </Link>
          <Link
            to="/vendors"
            className="px-6 py-3 border border-border text-text-primary font-sans text-sm tracking-wide rounded hover:border-text-primary transition-colors"
          >
            Browse Vendors
          </Link>
        </div>
      </div>
    </div>
  );
}
