import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Camera, ChevronLeft, ChevronRight, X, AlertCircle, Users, ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// ─── Types ────────────────────────────────────────────────────

type ColorTheme = 'classic-ivory' | 'modern-blush' | 'garden-green' | 'midnight';

interface WebsiteInfo {
  id: string;
  partner1_name: string | null;
  partner2_name: string | null;
  hashtag: string | null;
  color_theme: string;
  guest_photos_enabled: boolean;
  guest_album_public: boolean;
  accepting_uploads: boolean;
}

interface GuestPhoto {
  id: string;
  original_url: string;
  uploader_name: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  uploaded_at: string;
}

// ─── Theme config ─────────────────────────────────────────────

const THEME_CONFIG: Record<ColorTheme, {
  bg: string;
  bgAlt: string;
  text: string;
  textSecondary: string;
  accent: string;
  accentHex: string;
  accentText: string;
  border: string;
  card: string;
}> = {
  'classic-ivory': {
    bg: 'bg-[#FDFAF3]',
    bgAlt: 'bg-[#F5EDD8]',
    text: 'text-[#2A2520]',
    textSecondary: 'text-[#5A4F45]',
    accent: 'bg-[#8B3A3A]',
    accentHex: '#8B3A3A',
    accentText: 'text-[#8B3A3A]',
    border: 'border-[#D9CEBC]',
    card: 'bg-[#F5EDD8]/50',
  },
  'modern-blush': {
    bg: 'bg-[#FFF5F5]',
    bgAlt: 'bg-[#FFE8E8]',
    text: 'text-[#3D2B2B]',
    textSecondary: 'text-[#8B6F6F]',
    accent: 'bg-[#C97070]',
    accentHex: '#C97070',
    accentText: 'text-[#C97070]',
    border: 'border-[#E8C4C4]',
    card: 'bg-[#FFE8E8]/50',
  },
  'garden-green': {
    bg: 'bg-[#F5F9F5]',
    bgAlt: 'bg-[#E8F0E8]',
    text: 'text-[#2A3A2A]',
    textSecondary: 'text-[#5A6F5A]',
    accent: 'bg-[#4A7C59]',
    accentHex: '#4A7C59',
    accentText: 'text-[#4A7C59]',
    border: 'border-[#C4D9C4]',
    card: 'bg-[#E8F0E8]/50',
  },
  midnight: {
    bg: 'bg-[#0F1628]',
    bgAlt: 'bg-[#1A2340]',
    text: 'text-[#E8DCC8]',
    textSecondary: 'text-[#9A8E7A]',
    accent: 'bg-[#C4962E]',
    accentHex: '#C4962E',
    accentText: 'text-[#C4962E]',
    border: 'border-[#2A3555]',
    card: 'bg-[#1A2340]/50',
  },
};

const PAGE_SIZE = 20;

function getTheme(theme: string): typeof THEME_CONFIG['classic-ivory'] {
  return THEME_CONFIG[theme as ColorTheme] ?? THEME_CONFIG['classic-ivory'];
}

// ─── Component ────────────────────────────────────────────────

export default function PhotoAlbum() {
  const { slug } = useParams<{ slug: string }>();
  const [website, setWebsite] = useState<WebsiteInfo | null>(null);
  const [photos, setPhotos] = useState<GuestPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [photoCount, setPhotoCount] = useState(0);
  const [contributorCount, setContributorCount] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Fetch website info
  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data, error: fetchErr } = await supabase
        .from('celebration_websites')
        .select('id, partner1_name, partner2_name, hashtag, color_theme, guest_photos_enabled, guest_album_public, accepting_uploads')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (fetchErr || !data) {
        setError('Celebration not found');
        setLoading(false);
        return;
      }
      setWebsite(data as WebsiteInfo);
    })();
  }, [slug]);

  // Fetch photos + stats
  const fetchPhotos = useCallback(async (websiteId: string, offset: number) => {
    const { data, error: fetchErr } = await supabase
      .from('website_guest_photos')
      .select('id, original_url, uploader_name, caption, width, height, uploaded_at')
      .eq('website_id', websiteId)
      .eq('status', 'approved')
      .order('uploaded_at', { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);

    if (fetchErr) return [];
    return (data ?? []) as GuestPhoto[];
  }, []);

  // Initial photo load + counts
  useEffect(() => {
    if (!website) return;

    if (!website.guest_photos_enabled || !website.guest_album_public) {
      setLoading(false);
      return;
    }

    (async () => {
      const [initialPhotos, countResult, contributorResult] = await Promise.all([
        fetchPhotos(website.id, 0),
        supabase
          .from('website_guest_photos')
          .select('id', { count: 'exact', head: true })
          .eq('website_id', website.id)
          .eq('status', 'approved'),
        supabase
          .from('website_guest_photos')
          .select('uploader_name')
          .eq('website_id', website.id)
          .eq('status', 'approved')
          .not('uploader_name', 'is', null),
      ]);

      setPhotos(initialPhotos);
      setHasMore(initialPhotos.length >= PAGE_SIZE);
      setPhotoCount(countResult.count ?? 0);

      // Count unique contributors
      const uniqueNames = new Set(
        (contributorResult.data ?? [])
          .map((r) => (r.uploader_name as string).trim().toLowerCase())
          .filter(Boolean),
      );
      setContributorCount(uniqueNames.size);
      setLoading(false);
    })();
  }, [website, fetchPhotos]);

  // Infinite scroll
  const loadMore = useCallback(async () => {
    if (!website || loadingMore || !hasMore) return;
    setLoadingMore(true);
    const nextPhotos = await fetchPhotos(website.id, photos.length);
    setPhotos((prev) => [...prev, ...nextPhotos]);
    setHasMore(nextPhotos.length >= PAGE_SIZE);
    setLoadingMore(false);
  }, [website, loadingMore, hasMore, photos.length, fetchPhotos]);

  useEffect(() => {
    if (loading || !hasMore) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: '200px' },
    );
    observerRef.current.observe(sentinel);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loading, hasMore, loadMore]);

  // Lightbox keyboard nav
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i !== null && i < photos.length - 1 ? i + 1 : i));
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, photos.length]);

  // ─── Render ────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFAF3]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-[#8B3A3A] border-t-transparent" />
          <p className="text-sm text-[#5A4F45]">Loading album...</p>
        </div>
      </div>
    );
  }

  if (error || !website) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFAF3] px-6 text-center">
        <AlertCircle className="mb-4 h-12 w-12 text-[#C73E3A]" />
        <h1 className="mb-2 font-serif text-2xl font-semibold text-[#2A2520]">Page Not Found</h1>
        <p className="text-[#5A4F45]">{error ?? 'This celebration page does not exist.'}</p>
      </div>
    );
  }

  if (!website.guest_photos_enabled || !website.guest_album_public) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFAF3] px-6 text-center">
        <ImageIcon className="mb-4 h-12 w-12 text-[#5A4F45]" />
        <h1 className="mb-2 font-serif text-2xl font-semibold text-[#2A2520]">Album Not Available</h1>
        <p className="text-[#5A4F45]">This photo album is not currently public.</p>
      </div>
    );
  }

  const theme = getTheme(website.color_theme);
  const coupleNames = [website.partner1_name, website.partner2_name].filter(Boolean).join(' & ');

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text}`}>
      {/* Header */}
      <div className={`px-4 pb-6 pt-8 text-center ${theme.bgAlt}`}>
        {website.hashtag && (
          <p className={`mb-1 text-sm font-medium ${theme.accentText}`}>
            #{website.hashtag}
          </p>
        )}
        <h1 className="font-serif text-2xl font-semibold sm:text-3xl">
          {coupleNames ? `${coupleNames}'s Photos` : 'Photo Album'}
        </h1>

        {/* Stats */}
        <div className="mt-3 flex items-center justify-center gap-4">
          {photoCount > 0 && (
            <span className={`flex items-center gap-1 text-sm ${theme.textSecondary}`}>
              <ImageIcon className="h-4 w-4" />
              {photoCount} {photoCount === 1 ? 'photo' : 'photos'}
            </span>
          )}
          {contributorCount > 0 && (
            <span className={`flex items-center gap-1 text-sm ${theme.textSecondary}`}>
              <Users className="h-4 w-4" />
              {contributorCount} {contributorCount === 1 ? 'contributor' : 'contributors'}
            </span>
          )}
        </div>
      </div>

      {/* Upload CTA */}
      {website.accepting_uploads && (
        <div className="px-4 pt-4 text-center">
          <Link
            to={`/c/${slug}/photos`}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: theme.accentHex }}
          >
            <Camera className="h-4 w-4" />
            Upload Your Photos
          </Link>
        </div>
      )}

      {/* Empty state */}
      {photos.length === 0 && !loadingMore && (
        <div className="flex flex-col items-center px-6 py-16 text-center">
          <ImageIcon className="mb-4 h-14 w-14 opacity-30" />
          <p className={`text-lg font-medium ${theme.textSecondary}`}>No photos yet</p>
          <p className={`mt-1 text-sm ${theme.textSecondary}`}>Be the first to share a moment!</p>
          {website.accepting_uploads && (
            <Link
              to={`/c/${slug}/photos`}
              className="mt-4 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
              style={{ backgroundColor: theme.accentHex }}
            >
              <Camera className="h-4 w-4" />
              Upload Photos
            </Link>
          )}
        </div>
      )}

      {/* Masonry grid */}
      {photos.length > 0 && (
        <div className="px-3 py-4 sm:px-4">
          <div className="columns-2 gap-2 sm:columns-3 sm:gap-3 lg:columns-4">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="mb-2 break-inside-avoid sm:mb-3"
              >
                <button
                  onClick={() => setLightboxIndex(index)}
                  className="group relative w-full overflow-hidden rounded-xl"
                >
                  <img
                    src={photo.original_url}
                    alt={photo.caption ?? `Photo by ${photo.uploader_name ?? 'a guest'}`}
                    loading="lazy"
                    className="w-full rounded-xl object-cover transition duration-200 group-hover:scale-[1.02]"
                    style={{
                      aspectRatio: photo.width && photo.height ? `${photo.width}/${photo.height}` : undefined,
                    }}
                  />
                  {/* Overlay on hover */}
                  {(photo.uploader_name || photo.caption) && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pb-3 pt-8 opacity-0 transition group-hover:opacity-100">
                      {photo.uploader_name && (
                        <p className="text-xs font-medium text-white">{photo.uploader_name}</p>
                      )}
                      {photo.caption && (
                        <p className="mt-0.5 text-xs text-white/80">{photo.caption}</p>
                      )}
                    </div>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Infinite scroll sentinel */}
          <div ref={sentinelRef} className="h-1" />

          {loadingMore && (
            <div className="flex justify-center py-6">
              <div
                className="h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"
                style={{ borderColor: `${theme.accentHex} transparent ${theme.accentHex} ${theme.accentHex}` }}
              />
            </div>
          )}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          {lightboxIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex - 1);
              }}
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Next */}
          {lightboxIndex < photos.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex + 1);
              }}
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          {/* Image */}
          <img
            src={photos[lightboxIndex].original_url}
            alt={photos[lightboxIndex].caption ?? 'Full-size photo'}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Caption */}
          {(photos[lightboxIndex].uploader_name || photos[lightboxIndex].caption) && (
            <div className="absolute bottom-6 left-1/2 max-w-md -translate-x-1/2 rounded-xl bg-black/60 px-4 py-2 text-center backdrop-blur-sm">
              {photos[lightboxIndex].uploader_name && (
                <p className="text-sm font-medium text-white">
                  {photos[lightboxIndex].uploader_name}
                </p>
              )}
              {photos[lightboxIndex].caption && (
                <p className="mt-0.5 text-xs text-white/70">
                  {photos[lightboxIndex].caption}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="py-6 text-center">
        <p className={`text-xs ${theme.textSecondary}`}>
          Made with{' '}
          <span className="font-medium" style={{ color: theme.accentHex }}>
            haraya
          </span>
        </p>
      </div>
    </div>
  );
}
