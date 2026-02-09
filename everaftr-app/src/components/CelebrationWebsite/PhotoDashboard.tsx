import { useState, useEffect, useCallback } from 'react';
import {
  Camera,
  CheckCircle2,
  Clock,
  EyeOff,
  Trash2,
  RefreshCw,
  Image,
  Users,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

type PhotoStatus = 'pending' | 'approved' | 'hidden';

interface GuestPhoto {
  id: string;
  original_url: string;
  thumbnail_url: string | null;
  uploader_name: string | null;
  caption: string | null;
  status: PhotoStatus;
  uploaded_at: string;
}

interface PhotoStats {
  total_photos: number;
  approved_count: number;
  pending_count: number;
  hidden_count: number;
  contributor_count: number;
}

export default function PhotoDashboard({
  websiteId,
  autoApprove,
  onToggleAutoApprove,
}: {
  websiteId: string | null;
  autoApprove: boolean;
  onToggleAutoApprove: () => void;
}) {
  const [photos, setPhotos] = useState<GuestPhoto[]>([]);
  const [stats, setStats] = useState<PhotoStats>({
    total_photos: 0,
    approved_count: 0,
    pending_count: 0,
    hidden_count: 0,
    contributor_count: 0,
  });
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | PhotoStatus>('all');

  const fetchPhotos = useCallback(async () => {
    if (!websiteId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('website_guest_photos')
        .select('*')
        .eq('website_id', websiteId)
        .neq('status', 'deleted')
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      if (data) {
        const typedPhotos = data as GuestPhoto[];
        setPhotos(typedPhotos);
        const uploaders = new Set(typedPhotos.filter((p) => p.uploader_name).map((p) => p.uploader_name));
        setStats({
          total_photos: typedPhotos.length,
          approved_count: typedPhotos.filter((p) => p.status === 'approved').length,
          pending_count: typedPhotos.filter((p) => p.status === 'pending').length,
          hidden_count: typedPhotos.filter((p) => p.status === 'hidden').length,
          contributor_count: uploaders.size,
        });
      }
    } catch {
      // Supabase not configured or no data
    } finally {
      setLoading(false);
    }
  }, [websiteId]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const updatePhotoStatus = async (photoId: string, status: PhotoStatus | 'deleted') => {
    try {
      const { error } = await supabase
        .from('website_guest_photos')
        .update({ status })
        .eq('id', photoId);

      if (error) throw error;
      if (status === 'deleted') {
        setPhotos((prev) => prev.filter((p) => p.id !== photoId));
      } else {
        setPhotos((prev) => prev.map((p) => (p.id === photoId ? { ...p, status } : p)));
      }
      // Recalculate stats
      setStats((_prev) => {
        const updated = status === 'deleted'
          ? photos.filter((p) => p.id !== photoId)
          : photos.map((p) => (p.id === photoId ? { ...p, status } : p));
        const uploaders = new Set(updated.filter((p) => p.uploader_name).map((p) => p.uploader_name));
        return {
          total_photos: updated.length,
          approved_count: updated.filter((p) => p.status === 'approved').length,
          pending_count: updated.filter((p) => p.status === 'pending').length,
          hidden_count: updated.filter((p) => p.status === 'hidden').length,
          contributor_count: uploaders.size,
        };
      });
    } catch {
      // handle error silently for MVP
    }
  };

  const filteredPhotos = photos.filter((p) => filterStatus === 'all' || p.status === filterStatus);

  const cardCls = 'rounded-lg border border-border bg-bg-primary p-5 text-center';

  if (!websiteId) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-center">
        <Camera className="mx-auto mb-4 h-12 w-12 text-text-secondary/40" />
        <h2 className="font-serif text-2xl font-light text-text-primary">Guest Photos</h2>
        <p className="mt-2 font-sans text-sm text-text-secondary">
          Publish your website first to start receiving guest photos.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <div className={cardCls}>
          <Image className="mx-auto mb-2 h-5 w-5 text-accent-primary" />
          <div className="font-serif text-xl font-light text-text-primary">{stats.total_photos}</div>
          <div className="font-sans text-[10px] font-medium uppercase tracking-wider text-text-secondary">
            Total
          </div>
        </div>
        <div className={cardCls}>
          <CheckCircle2 className="mx-auto mb-2 h-5 w-5 text-accent-success" />
          <div className="font-serif text-xl font-light text-text-primary">{stats.approved_count}</div>
          <div className="font-sans text-[10px] font-medium uppercase tracking-wider text-text-secondary">
            Approved
          </div>
        </div>
        <div className={cardCls}>
          <Clock className="mx-auto mb-2 h-5 w-5 text-accent-warning" />
          <div className="font-serif text-xl font-light text-text-primary">{stats.pending_count}</div>
          <div className="font-sans text-[10px] font-medium uppercase tracking-wider text-text-secondary">
            Pending
          </div>
        </div>
        <div className={cardCls}>
          <EyeOff className="mx-auto mb-2 h-5 w-5 text-text-secondary" />
          <div className="font-serif text-xl font-light text-text-primary">{stats.hidden_count}</div>
          <div className="font-sans text-[10px] font-medium uppercase tracking-wider text-text-secondary">
            Hidden
          </div>
        </div>
        <div className={cardCls}>
          <Users className="mx-auto mb-2 h-5 w-5 text-accent-info" />
          <div className="font-serif text-xl font-light text-text-primary">{stats.contributor_count}</div>
          <div className="font-sans text-[10px] font-medium uppercase tracking-wider text-text-secondary">
            Contributors
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {/* Filter buttons */}
          {(['all', 'approved', 'pending', 'hidden'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`font-sans text-xs font-medium capitalize transition ${
                filterStatus === status
                  ? 'text-accent-primary underline underline-offset-4'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {/* Auto-approve toggle */}
          <label className="flex cursor-pointer items-center gap-2">
            <div
              className={`relative h-5 w-9 rounded-full transition ${
                autoApprove ? 'bg-accent-primary' : 'bg-border'
              }`}
              onClick={onToggleAutoApprove}
            >
              <div
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${
                  autoApprove ? 'left-4' : 'left-0.5'
                }`}
              />
            </div>
            <span className="font-sans text-xs text-text-secondary">Auto-approve</span>
          </label>
          <button
            onClick={fetchPhotos}
            className="flex items-center gap-1.5 rounded border border-border px-3 py-2 font-sans text-xs font-medium text-text-secondary transition hover:border-text-primary hover:text-text-primary"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Photo Grid */}
      {filteredPhotos.length === 0 ? (
        <div className="rounded-lg border border-border bg-bg-primary p-10 text-center">
          <Camera className="mx-auto mb-3 h-10 w-10 text-text-secondary/30" />
          <p className="font-sans text-sm text-text-secondary">
            {photos.length === 0
              ? 'No guest photos yet. Share the photo upload QR code at your celebration!'
              : 'No photos match the selected filter.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group relative overflow-hidden rounded-lg border border-border"
            >
              <div className="aspect-square">
                <img
                  src={photo.thumbnail_url || photo.original_url}
                  alt={photo.caption || 'Guest photo'}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Status badge */}
              <div className="absolute left-2 top-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-sans text-[10px] font-medium ${
                    photo.status === 'approved'
                      ? 'bg-accent-success/90 text-white'
                      : photo.status === 'pending'
                        ? 'bg-accent-warning/90 text-white'
                        : 'bg-text-secondary/70 text-white'
                  }`}
                >
                  {photo.status === 'approved' && <CheckCircle2 className="h-2.5 w-2.5" />}
                  {photo.status === 'pending' && <Clock className="h-2.5 w-2.5" />}
                  {photo.status === 'hidden' && <EyeOff className="h-2.5 w-2.5" />}
                  {photo.status}
                </span>
              </div>

              {/* Action buttons overlay */}
              <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1.5 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                {photo.status !== 'approved' && (
                  <button
                    onClick={() => updatePhotoStatus(photo.id, 'approved')}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-success text-white transition hover:bg-accent-success/80"
                    title="Approve"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </button>
                )}
                {photo.status !== 'hidden' && (
                  <button
                    onClick={() => updatePhotoStatus(photo.id, 'hidden')}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-text-secondary text-white transition hover:bg-text-secondary/80"
                    title="Hide"
                  >
                    <EyeOff className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  onClick={() => updatePhotoStatus(photo.id, 'deleted')}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-error text-white transition hover:bg-accent-error/80"
                  title="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Uploader name */}
              {photo.uploader_name && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 px-2 py-1 group-hover:hidden">
                  <span className="font-sans text-[10px] text-white">{photo.uploader_name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
