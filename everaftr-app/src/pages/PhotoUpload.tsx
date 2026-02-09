import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Camera, ImagePlus, Upload, CheckCircle2, AlertCircle, X, Images, Heart } from 'lucide-react';
import imageCompression from 'browser-image-compression';
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
  accepting_uploads: boolean;
  max_guest_photos: number;
  guest_photos_auto_approve: boolean;
}

interface UploadingPhoto {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: 'compressing' | 'uploading' | 'success' | 'error';
  error?: string;
}

// ─── Theme config (mirrors CoupleWebsite) ─────────────────────

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

const GUEST_NAME_KEY = 'haraya-guest-name';

// ─── Helpers ──────────────────────────────────────────────────

function getTheme(theme: string): typeof THEME_CONFIG['classic-ivory'] {
  return THEME_CONFIG[theme as ColorTheme] ?? THEME_CONFIG['classic-ivory'];
}

function uid() {
  return crypto.randomUUID?.() ?? Math.random().toString(36).slice(2, 11) + Date.now().toString(36);
}

async function compressImage(file: File): Promise<File> {
  return imageCompression(file, {
    maxSizeMB: 2,
    maxWidthOrHeight: 2048,
    useWebWorker: true,
    fileType: 'image/jpeg',
    initialQuality: 0.8,
  });
}

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => {
      resolve({ width: 0, height: 0 });
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  });
}

async function uploadWithRetry(
  bucket: string,
  path: string,
  file: File,
  maxRetries = 3,
): Promise<{ data: { path: string } | null; error: Error | null }> {
  const delays = [1000, 2000, 4000];
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
      contentType: 'image/jpeg',
      upsert: false,
    });
    if (!error) return { data, error: null };
    if (attempt < maxRetries) {
      await new Promise((r) => setTimeout(r, delays[attempt]));
    } else {
      return { data: null, error };
    }
  }
  return { data: null, error: new Error('Upload failed after retries') };
}

// ─── Component ────────────────────────────────────────────────

export default function PhotoUpload() {
  const { slug } = useParams<{ slug: string }>();
  const [website, setWebsite] = useState<WebsiteInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [guestName, setGuestName] = useState(() => localStorage.getItem(GUEST_NAME_KEY) ?? '');
  const [caption, setCaption] = useState('');
  const [photos, setPhotos] = useState<UploadingPhoto[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  // Fetch website info
  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data, error: fetchErr } = await supabase
        .from('celebration_websites')
        .select('id, partner1_name, partner2_name, hashtag, color_theme, guest_photos_enabled, accepting_uploads, max_guest_photos, guest_photos_auto_approve')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (fetchErr || !data) {
        setError('Celebration not found');
        setLoading(false);
        return;
      }
      setWebsite(data as WebsiteInfo);
      setLoading(false);
    })();
  }, [slug]);

  // Save guest name to localStorage
  useEffect(() => {
    if (guestName) localStorage.setItem(GUEST_NAME_KEY, guestName);
  }, [guestName]);

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || !website) return;

    const fileArray = Array.from(files).slice(0, 10);
    const newPhotos: UploadingPhoto[] = fileArray.map((file) => ({
      id: uid(),
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: 'compressing' as const,
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);

    for (const photo of newPhotos) {
      try {
        // Compress
        setPhotos((prev) =>
          prev.map((p) => (p.id === photo.id ? { ...p, status: 'compressing' as const, progress: 10 } : p)),
        );

        const compressed = await compressImage(photo.file);
        const dims = await getImageDimensions(compressed);

        // Upload
        setPhotos((prev) =>
          prev.map((p) => (p.id === photo.id ? { ...p, status: 'uploading' as const, progress: 40 } : p)),
        );

        const storagePath = `${website.id}/originals/${photo.id}.jpg`;
        const { error: uploadErr } = await uploadWithRetry('website-guest-photos', storagePath, compressed);

        if (uploadErr) {
          setPhotos((prev) =>
            prev.map((p) =>
              p.id === photo.id ? { ...p, status: 'error' as const, error: 'Upload failed. Try again.' } : p,
            ),
          );
          continue;
        }

        setPhotos((prev) =>
          prev.map((p) => (p.id === photo.id ? { ...p, progress: 70 } : p)),
        );

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('website-guest-photos')
          .getPublicUrl(storagePath);

        // Insert DB record
        const status = website.guest_photos_auto_approve ? 'approved' : 'pending';
        const { error: dbErr } = await supabase.from('website_guest_photos').insert({
          website_id: website.id,
          original_url: urlData.publicUrl,
          uploader_name: guestName || null,
          caption: caption || null,
          file_size_bytes: compressed.size,
          width: dims.width,
          height: dims.height,
          status,
        });

        if (dbErr) {
          setPhotos((prev) =>
            prev.map((p) =>
              p.id === photo.id ? { ...p, status: 'error' as const, error: 'Failed to save photo info.' } : p,
            ),
          );
          continue;
        }

        setPhotos((prev) =>
          prev.map((p) => (p.id === photo.id ? { ...p, status: 'success' as const, progress: 100 } : p)),
        );
      } catch {
        setPhotos((prev) =>
          prev.map((p) =>
            p.id === photo.id ? { ...p, status: 'error' as const, error: 'Something went wrong.' } : p,
          ),
        );
      }
    }

    setShowSuccess(true);
  }, [website, guestName, caption]);

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const photo = prev.find((p) => p.id === id);
      if (photo) URL.revokeObjectURL(photo.preview);
      return prev.filter((p) => p.id !== id);
    });
  };

  const resetForMore = () => {
    photos.forEach((p) => URL.revokeObjectURL(p.preview));
    setPhotos([]);
    setCaption('');
    setShowSuccess(false);
  };

  // ─── Render ────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFAF3]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-[#8B3A3A] border-t-transparent" />
          <p className="text-sm text-[#5A4F45]">Loading...</p>
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

  if (!website.guest_photos_enabled || !website.accepting_uploads) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFAF3] px-6 text-center">
        <Camera className="mb-4 h-12 w-12 text-[#5A4F45]" />
        <h1 className="mb-2 font-serif text-2xl font-semibold text-[#2A2520]">Photo Uploads Closed</h1>
        <p className="text-[#5A4F45]">The couple is not currently accepting photo uploads.</p>
        <Link to={`/c/${slug}/album`} className="mt-6 text-sm font-medium underline text-[#8B3A3A]">
          View Photo Album
        </Link>
      </div>
    );
  }

  const theme = getTheme(website.color_theme);
  const coupleNames = [website.partner1_name, website.partner2_name].filter(Boolean).join(' & ');
  const allDone = photos.length > 0 && photos.every((p) => p.status === 'success' || p.status === 'error');
  const hasUploading = photos.some((p) => p.status === 'compressing' || p.status === 'uploading');

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
          {coupleNames || 'Our Celebration'}
        </h1>
        <p className={`mt-1 text-sm ${theme.textSecondary}`}>Share your photos with us!</p>
      </div>

      <div className="mx-auto max-w-lg px-4 py-6">
        {/* Guest name */}
        <div className="mb-4">
          <label className={`mb-1 block text-sm font-medium ${theme.textSecondary}`}>
            Your name (optional)
          </label>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="So we know who took these amazing photos"
            className={`w-full rounded-xl border ${theme.border} ${theme.bg} px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[${theme.accentHex}]/30`}
          />
        </div>

        {/* Caption */}
        <div className="mb-6">
          <label className={`mb-1 block text-sm font-medium ${theme.textSecondary}`}>
            Caption (optional)
          </label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Add a message with your photos"
            className={`w-full rounded-xl border ${theme.border} ${theme.bg} px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[${theme.accentHex}]/30`}
          />
        </div>

        {/* Upload buttons */}
        {!showSuccess && (
          <div className="mb-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => cameraRef.current?.click()}
              disabled={hasUploading}
              className={`flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed ${theme.border} ${theme.card} p-4 transition hover:opacity-80 active:scale-[0.98] disabled:opacity-50`}
            >
              <Camera className="h-8 w-8" style={{ color: theme.accentHex }} />
              <span className="text-sm font-medium">Take a Photo</span>
            </button>
            <button
              onClick={() => galleryRef.current?.click()}
              disabled={hasUploading}
              className={`flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed ${theme.border} ${theme.card} p-4 transition hover:opacity-80 active:scale-[0.98] disabled:opacity-50`}
            >
              <ImagePlus className="h-8 w-8" style={{ color: theme.accentHex }} />
              <span className="text-sm font-medium">Choose from Gallery</span>
              <span className={`text-xs ${theme.textSecondary}`}>Up to 10 photos</span>
            </button>
          </div>
        )}

        {/* Hidden inputs */}
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = '';
          }}
        />
        <input
          ref={galleryRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = '';
          }}
        />

        {/* Photo previews + progress */}
        {photos.length > 0 && (
          <div className="mb-6 space-y-3">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className={`flex items-center gap-3 rounded-xl border ${theme.border} ${theme.card} p-3`}
              >
                <img
                  src={photo.preview}
                  alt=""
                  className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  {photo.status === 'compressing' && (
                    <div>
                      <p className="text-sm font-medium">Compressing...</p>
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-black/10">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{ width: `${photo.progress}%`, backgroundColor: theme.accentHex }}
                        />
                      </div>
                    </div>
                  )}
                  {photo.status === 'uploading' && (
                    <div>
                      <p className="text-sm font-medium">Uploading...</p>
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-black/10">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{ width: `${photo.progress}%`, backgroundColor: theme.accentHex }}
                        />
                      </div>
                    </div>
                  )}
                  {photo.status === 'success' && (
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <p className="text-sm font-medium text-green-700">Uploaded!</p>
                    </div>
                  )}
                  {photo.status === 'error' && (
                    <div className="flex items-center gap-1.5">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <p className="text-sm text-red-600">{photo.error}</p>
                    </div>
                  )}
                </div>
                {(photo.status === 'success' || photo.status === 'error') && (
                  <button
                    onClick={() => removePhoto(photo.id)}
                    className="flex-shrink-0 rounded-full p-1.5 transition hover:bg-black/5"
                    aria-label="Dismiss"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Success state */}
        {showSuccess && allDone && (
          <div className={`mb-6 rounded-2xl border ${theme.border} ${theme.card} p-6 text-center`}>
            <div className="mb-3 flex justify-center">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ backgroundColor: `${theme.accentHex}15` }}
              >
                <Heart className="h-7 w-7" style={{ color: theme.accentHex }} />
              </div>
            </div>
            <h2 className="mb-1 font-serif text-xl font-semibold">Salamat!</h2>
            <p className={`mb-5 text-sm ${theme.textSecondary}`}>
              Your {photos.filter((p) => p.status === 'success').length === 1 ? 'photo has' : 'photos have'} been uploaded successfully.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <button
                onClick={resetForMore}
                className="rounded-xl px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: theme.accentHex }}
              >
                <Upload className="mr-2 inline-block h-4 w-4" />
                Upload More
              </button>
              <Link
                to={`/c/${slug}/album`}
                className={`rounded-xl border ${theme.border} px-6 py-3 text-center text-sm font-medium transition hover:opacity-80`}
              >
                <Images className="mr-2 inline-block h-4 w-4" />
                View Album
              </Link>
            </div>
          </div>
        )}

        {/* View album link */}
        <div className="pt-4 text-center">
          <Link
            to={`/c/${slug}/album`}
            className={`text-sm font-medium ${theme.accentText} underline`}
          >
            View the photo album
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 text-center">
        <p className={`text-xs ${theme.textSecondary}`}>
          By uploading, you agree that the couple may share these photos.
        </p>
        <p className={`mt-2 text-xs ${theme.textSecondary}`}>
          Made with{' '}
          <span className="font-medium" style={{ color: theme.accentHex }}>
            haraya
          </span>
        </p>
      </div>
    </div>
  );
}
