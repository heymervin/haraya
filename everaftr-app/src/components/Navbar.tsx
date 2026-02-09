import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, CheckCircle, Users, Globe, Sparkles, Heart } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [planDropdownOpen, setPlanDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const mainNavLinks = [
    { path: '/vendors', label: 'Find Vendors' },
    { path: '/celebrations', label: 'Celebrations' },
    { path: '/community', label: 'Community' },
    { path: '/kasa', label: 'Kasa' },
  ];

  const planningLinks = [
    {
      path: '/plan',
      label: 'Checklist & Budget',
      description: 'Track tasks and manage spending',
      icon: CheckCircle
    },
    {
      path: '/guests',
      label: 'Guest List',
      description: 'Manage RSVPs and seating',
      icon: Users
    },
    {
      path: '/our-wedding',
      label: 'Celebration Website',
      description: 'Build your wedding website',
      icon: Globe
    },
    {
      path: '/matchmaker',
      label: 'Matchmaker Quiz',
      description: 'Find your perfect vendors',
      icon: Sparkles
    },
    {
      path: '/favorites',
      label: 'Favorites',
      description: 'Your saved vendors',
      icon: Heart
    },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isPlanningActive = planningLinks.some(l => isActive(l.path));

  // Close dropdown on route change
  useEffect(() => {
    setPlanDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPlanDropdownOpen(false);
      }
    };

    if (planDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [planDropdownOpen]);

  // Handle hover with delay
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setPlanDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setPlanDropdownOpen(false);
    }, 150);
  };

  // Handle click toggle
  const handleClick = () => {
    setPlanDropdownOpen((prev) => !prev);
  };

  // Close dropdown when a link is clicked
  const handleLinkClick = () => {
    setPlanDropdownOpen(false);
  };

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
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={handleClick}
                className={`flex items-center gap-1 font-sans font-normal text-[14px] tracking-[0.08em] transition-colors ${
                  isPlanningActive
                    ? 'text-accent-primary'
                    : 'text-text-primary hover:text-accent-primary'
                }`}
              >
                Plan <ChevronDown className={`w-3.5 h-3.5 transition-transform ${planDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {planDropdownOpen && (
                <div className="absolute top-full right-0 w-64 bg-bg-primary border border-border rounded-lg shadow-lg z-50 pt-2 transition-all duration-200 ease-out origin-top animate-in fade-in slide-in-from-top-2">
                  {planningLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={handleLinkClick}
                        className={`flex items-start gap-3 px-4 py-3 font-sans transition-colors ${
                          isActive(link.path)
                            ? 'text-accent-primary bg-whisper'
                            : 'text-text-primary hover:text-accent-primary hover:bg-whisper'
                        }`}
                      >
                        <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[14px] tracking-[0.08em] font-medium">{link.label}</span>
                          <span className="text-[12px] text-text-secondary leading-tight">{link.description}</span>
                        </div>
                      </Link>
                    );
                  })}
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
