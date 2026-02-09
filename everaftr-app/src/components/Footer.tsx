import { Link } from 'react-router-dom';
import DreamLine from './DreamLine';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const coupleLinks = [
    { path: '/vendors', label: 'Find Vendors' },
    { path: '/plan', label: 'Plan' },
    { path: '/guests', label: 'Guest List' },
    { path: '/our-wedding', label: 'Celebration Website' },
    { path: '/matchmaker', label: 'Matchmaker' },
    { path: '/favorites', label: 'Favorites' },
  ];

  const communityLinks = [
    { path: '/celebrations', label: 'Celebrations' },
    { path: '/community', label: 'Community' },
    { path: '/kasa', label: 'Ask Kasa' },
    { path: '/about', label: 'About' },
  ];

  const vendorLinks = [
    { path: '/vendor-dashboard', label: 'Vendor Dashboard' },
    { path: '/about', label: 'List Your Business' },
  ];

  return (
    <footer className="bg-bg-deep text-text-on-dark mt-auto">
      <DreamLine variant="full" />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <h2 className="font-sans font-light text-[28px] tracking-[0.15em] text-accent-primary mb-4">
              haraya
            </h2>
            <p className="font-serif italic text-[18px] text-accent-primary mb-3">
              where dreams take shape
            </p>
            <p className="font-sans font-light text-[14px] leading-relaxed opacity-80">
              for every couple. every love story. every celebration.
            </p>
          </div>

          {/* For Couples */}
          <div>
            <h3 className="font-sans font-medium text-[14px] tracking-wider uppercase mb-4 opacity-60">For Couples</h3>
            <div className="space-y-2">
              {coupleLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block font-sans font-light text-[14px] tracking-[0.05em] hover:text-accent-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-sans font-medium text-[14px] tracking-wider uppercase mb-4 opacity-60">Explore</h3>
            <div className="space-y-2">
              {communityLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block font-sans font-light text-[14px] tracking-[0.05em] hover:text-accent-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* For Vendors */}
          <div>
            <h3 className="font-sans font-medium text-[14px] tracking-wider uppercase mb-4 opacity-60">For Vendors</h3>
            <div className="space-y-2">
              {vendorLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block font-sans font-light text-[14px] tracking-[0.05em] hover:text-accent-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-dusk-gray/40 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] opacity-70">
          <p className="font-sans font-light">
            &copy; {currentYear} haraya. All rights reserved.
          </p>
          <p className="font-sans font-light tracking-wide">
            Dream it. Plan it. Celebrate it.
          </p>
        </div>
      </div>
    </footer>
  );
}
