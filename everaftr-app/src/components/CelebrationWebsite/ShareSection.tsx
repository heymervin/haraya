import { useState, useEffect, useRef } from 'react';
import {
  Copy,
  CheckCircle2,
  QrCode,
  Download,
  Camera,
  Globe,
  MessageCircle,
} from 'lucide-react';
import QRCode from 'qrcode';

interface ShareSectionProps {
  slug: string | null;
  hashtag: string;
  partner1Name: string;
  partner2Name: string;
}

export default function ShareSection({ slug, hashtag, partner1Name, partner2Name }: ShareSectionProps) {
  const websiteUrl = slug ? `${window.location.origin}/c/${slug}` : '';
  const photoUrl = slug ? `${window.location.origin}/c/${slug}/photos` : '';

  const [copiedWebsite, setCopiedWebsite] = useState(false);
  const [copiedPhoto, setCopiedPhoto] = useState(false);
  const websiteQrRef = useRef<HTMLCanvasElement>(null);
  const photoQrRef = useRef<HTMLCanvasElement>(null);

  const displayNames =
    partner1Name && partner2Name
      ? `${partner1Name} & ${partner2Name}`
      : partner1Name || partner2Name || 'Your Celebration';

  useEffect(() => {
    if (!slug) return;
    if (websiteQrRef.current) {
      QRCode.toCanvas(websiteQrRef.current, websiteUrl, {
        width: 256,
        margin: 2,
        color: { dark: '#2A2838', light: '#F7F5FB' },
      });
    }
    if (photoQrRef.current) {
      QRCode.toCanvas(photoQrRef.current, photoUrl, {
        width: 256,
        margin: 2,
        color: { dark: '#2A2838', light: '#F7F5FB' },
      });
    }
  }, [slug, websiteUrl, photoUrl]);

  const copyToClipboard = (text: string, type: 'website' | 'photo') => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === 'website') {
        setCopiedWebsite(true);
        setTimeout(() => setCopiedWebsite(false), 2500);
      } else {
        setCopiedPhoto(true);
        setTimeout(() => setCopiedPhoto(false), 2500);
      }
    });
  };

  const downloadQr = (canvas: HTMLCanvasElement | null, filename: string) => {
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const viberShareUrl = (url: string, message: string) => {
    return `viber://forward?text=${encodeURIComponent(message + '\n\n' + url)}`;
  };

  const websiteShareMessage = `You're invited!\n\n${displayNames}'s celebration${hashtag ? `\n#${hashtag}` : ''}\n\nPlease RSVP here:`;
  const photoShareMessage = `Share your photos!\n\nHelp ${displayNames} capture their special day!${hashtag ? `\n#${hashtag}` : ''}`;

  if (!slug) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <QrCode className="mx-auto mb-4 h-12 w-12 text-text-secondary/40" />
        <h2 className="font-serif text-2xl font-light text-text-primary">Share Your Website</h2>
        <p className="mt-2 font-sans text-sm text-text-secondary">
          Publish your website first to get your shareable link and QR codes.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-10 px-6 py-10">
      {/* Website QR & Link */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 font-serif text-2xl font-light text-text-primary">
          <Globe className="h-5 w-5 text-accent-primary" />
          Website Link
        </h2>
        <p className="font-sans text-sm text-text-secondary">
          Share this link with your guests so they can view your celebration website and RSVP.
        </p>

        <div className="flex items-center gap-3 rounded-lg border border-border bg-bg-primary p-4">
          <code className="flex-1 truncate font-sans text-sm text-accent-primary">{websiteUrl}</code>
          <button
            onClick={() => copyToClipboard(websiteUrl, 'website')}
            className="flex items-center gap-1.5 rounded border border-border px-3 py-2 font-sans text-xs font-medium text-text-secondary transition hover:border-text-primary hover:text-text-primary"
          >
            {copiedWebsite ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-accent-success" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy
              </>
            )}
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-bg-primary p-6 sm:flex-row">
          <canvas ref={websiteQrRef} className="h-48 w-48 rounded" />
          <div className="flex-1 space-y-3 text-center sm:text-left">
            <h3 className="font-sans text-sm font-medium text-text-primary">Website QR Code</h3>
            <p className="font-sans text-xs text-text-secondary">
              Print this QR code on your physical invitations. Guests scan it to view your website and RSVP.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => downloadQr(websiteQrRef.current, `${slug}-website-qr`)}
                className="flex items-center gap-1.5 rounded bg-accent-primary px-4 py-2 font-sans text-xs font-medium text-text-on-dark transition hover:bg-accent-primary-hover"
              >
                <Download className="h-3.5 w-3.5" />
                Download PNG
              </button>
              <a
                href={viberShareUrl(websiteUrl, websiteShareMessage)}
                className="flex items-center gap-1.5 rounded border border-border px-4 py-2 font-sans text-xs font-medium text-text-secondary transition hover:border-text-primary hover:text-text-primary"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Viber
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Upload QR & Link */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 font-serif text-2xl font-light text-text-primary">
          <Camera className="h-5 w-5 text-accent-primary" />
          Photo Upload Link
        </h2>
        <p className="font-sans text-sm text-text-secondary">
          Share this link at your celebration so guests can upload their photos. Display the QR code on table cards or a standee.
        </p>

        <div className="flex items-center gap-3 rounded-lg border border-border bg-bg-primary p-4">
          <code className="flex-1 truncate font-sans text-sm text-accent-primary">{photoUrl}</code>
          <button
            onClick={() => copyToClipboard(photoUrl, 'photo')}
            className="flex items-center gap-1.5 rounded border border-border px-3 py-2 font-sans text-xs font-medium text-text-secondary transition hover:border-text-primary hover:text-text-primary"
          >
            {copiedPhoto ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-accent-success" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy
              </>
            )}
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-bg-primary p-6 sm:flex-row">
          <canvas ref={photoQrRef} className="h-48 w-48 rounded" />
          <div className="flex-1 space-y-3 text-center sm:text-left">
            <h3 className="font-sans text-sm font-medium text-text-primary">Photo Upload QR Code</h3>
            <p className="font-sans text-xs text-text-secondary">
              Display this at your venue — on table cards, a standee, or the welcome screen. Guests scan to upload photos directly from their phones.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => downloadQr(photoQrRef.current, `${slug}-photo-qr`)}
                className="flex items-center gap-1.5 rounded bg-accent-primary px-4 py-2 font-sans text-xs font-medium text-text-on-dark transition hover:bg-accent-primary-hover"
              >
                <Download className="h-3.5 w-3.5" />
                Download PNG
              </button>
              <a
                href={viberShareUrl(photoUrl, photoShareMessage)}
                className="flex items-center gap-1.5 rounded border border-border px-4 py-2 font-sans text-xs font-medium text-text-secondary transition hover:border-text-primary hover:text-text-primary"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Viber
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
