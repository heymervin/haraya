import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [planDropdownOpen, setPlanDropdownOpen] = useState(false);
  const location = useLocation();

  const mainNavLinks = [
    { path: '/vendors', label: 'Find Vendors' },
    { path: '/celebrations', label: 'Celebrations' },
    { path: '/community', label: 'Community' },
    { path: '/kasa', label: 'Kasa' },
  ];

  const planningLinks = [
    { path: '/plan', label: 'Checklist & Budget' },
    { path: '/guests', label: 'Guest List' },
    { path: '/our-wedding', label: 'Celebration Website' },
    { path: '/matchmaker', label: 'Matchmaker Quiz' },
    { path: '/favorites', label: 'Favorites' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isPlanningActive = planningLinks.some(l => isActive(l.path));

  return (
    <nav className="sticky top-0 z-50 bg-bg-primary/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Wordmark */}
          <Link
            to="/"
            className="font-sans font-light text-[20px] lg:text-[24px] tracking-[0.15em] text-accent-primary hover:opacity-80 transition-opacity"
          >
            haraya
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {mainNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-sans font-normal text-[14px] tracking-[0.08em] transition-colors ${
                  isActive(link.path)
                    ? 'text-accent-primary'
                    : 'text-text-primary hover:text-accent-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Planning Dropdown */}
            <div className="relative"
              onMouseEnter={() => setPlanDropdownOpen(true)}
              onMouseLeave={() => setPlanDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 font-sans font-normal text-[14px] tracking-[0.08em] transition-colors ${
                  isPlanningActive
                    ? 'text-accent-primary'
                    : 'text-text-primary hover:text-accent-primary'
                }`}
              >
                Plan <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {planDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-bg-primary border border-border rounded-lg shadow-lg py-2 z-50">
                  {planningLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-4 py-2 font-sans text-[13px] transition-colors ${
                        isActive(link.path)
                          ? 'text-accent-primary bg-whisper'
                          : 'text-text-primary hover:text-accent-primary hover:bg-whisper'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/about"
              className={`font-sans font-normal text-[14px] tracking-[0.08em] transition-colors ${
                isActive('/about')
                  ? 'text-accent-primary'
                  : 'text-text-primary hover:text-accent-primary'
              }`}
            >
              About
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-text-primary hover:text-accent-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-whisper">
          <div className="px-6 py-4 space-y-1">
            {mainNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 font-sans font-normal text-[14px] tracking-[0.08em] transition-colors ${
                  isActive(link.path)
                    ? 'text-accent-primary'
                    : 'text-text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Planning Section */}
            <div className="pt-2 pb-1">
              <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-text-secondary mb-1">Planning Tools</p>
            </div>
            {planningLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 pl-3 font-sans font-normal text-[14px] tracking-[0.08em] transition-colors ${
                  isActive(link.path)
                    ? 'text-accent-primary'
                    : 'text-text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-2 border-t border-border">
              <Link
                to="/vendor-dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 font-sans font-normal text-[14px] tracking-[0.08em] text-text-primary"
              >
                Vendor Dashboard
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 font-sans font-normal text-[14px] tracking-[0.08em] text-text-primary"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
