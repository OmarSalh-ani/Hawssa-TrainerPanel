'use client';

import { ReleaseVideo } from '@/lib/types/releases';
import { Play, X, Pause } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

interface ReleaseVideoViewerProps {
  video: ReleaseVideo;
  onClose?: () => void;
}

const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes} min`;
};

export function ReleaseVideoViewer({ video, onClose }: ReleaseVideoViewerProps) {
  type TimeUpdateEvent = { seconds: number; duration: number; percent: number };
  type PlayerAPI = {
    play: () => Promise<void>;
    pause: () => Promise<void>;
    on: (
      event:
        | 'play'
        | 'pause'
        | 'timeupdate'
        | 'bufferstart'
        | 'bufferend'
        | 'seeked',
      cb: (e?: TimeUpdateEvent) => void
    ) => void;
    getDuration: () => Promise<number>;
    setCurrentTime: (time: number) => Promise<number>;
  };
  type VimeoGlobal = { Player: new (element: HTMLIFrameElement) => PlayerAPI };
  const isVimeo = !!video.videoUrl && video.videoUrl.includes('vimeo.com');
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [player, setPlayer] = useState<PlayerAPI | null>(null);
  const [showOverlay, setShowOverlay] = useState<boolean>(isVimeo);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);

  const toVimeoEmbed = (url: string) => {
    try {
      const u = new URL(url);
      const host = u.hostname;
      if (host.includes('player.vimeo.com')) {
        return u.pathname.replace(/^\/+/, '').startsWith('video/')
          ? `https://player.vimeo.com${u.pathname}${u.search}`
          : `https://player.vimeo.com/video${u.pathname}${u.search}`;
      }
      if (host.includes('vimeo.com')) {
        const match = u.pathname.match(/\/(?:video\/)?(\d+)/);
        const id = match?.[1];
        if (id) return `https://player.vimeo.com/video/${id}`;
      }
      return url;
    } catch {
      return url;
    }
  };
  const getVimeoIdFromVideo = () => {
    const fromField =
      (video as { vimeoId?: string | number; VimeoId?: string | number; ViemoId?: string | number }).vimeoId ??
      (video as { vimeoId?: string | number; VimeoId?: string | number; ViemoId?: string | number }).VimeoId ??
      (video as { vimeoId?: string | number; VimeoId?: string | number; ViemoId?: string | number }).ViemoId ??
      null;
    if (fromField != null && `${fromField}`.trim() !== '') return `${fromField}`;
    return null;
  };
  const embedSrc = (() => {
    if (!video.videoUrl) return '';
    try {
      const idFromField = getVimeoIdFromVideo();
      if (idFromField) {
        const base = new URL(`https://player.vimeo.com/video/${idFromField}`);
        base.searchParams.set('controls', '0');
        base.searchParams.set('title', '0');
        base.searchParams.set('byline', '0');
        base.searchParams.set('portrait', '0');
        base.searchParams.set('transparent', '0');
        return base.toString();
      }
      if (isVimeo) {
        const base = new URL(toVimeoEmbed(video.videoUrl));
        base.searchParams.set('controls', '0');
        base.searchParams.set('title', '0');
        base.searchParams.set('byline', '0');
        base.searchParams.set('portrait', '0');
        base.searchParams.set('transparent', '0');
        return base.toString();
      }
      return new URL(video.videoUrl).toString();
    } catch {
      return video.videoUrl;
    }
  })();

  const initVimeo = () => {
    if (!isVimeo || !iframeRef.current) return;
    const w = window as unknown as { Vimeo?: VimeoGlobal };
    if (!w.Vimeo) return;
    try {
      const p = new w.Vimeo.Player(iframeRef.current);
      p.on('play', () => {
        setShowOverlay(false);
        setIsPlaying(true);
        setIsBuffering(false);
      });
      p.on('pause', () => setIsPlaying(false));
      p.on('bufferstart', () => setIsBuffering(true));
      p.on('bufferend', () => setIsBuffering(false));
      p.on('seeked', () => setIsBuffering(false));
      p.on('timeupdate', e => {
        if (!e) return;
        if (!isScrubbing) setCurrentTime(e.seconds);
        if (!duration && e.duration) setDuration(e.duration);
      });
      p.getDuration().then(d => setDuration(d || 0)).catch(() => {});
      setPlayer(p);
    } catch {
      setPlayer(null);
    }
  };

  useEffect(() => {
    if (isVimeo) initVimeo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVimeo, video.videoUrl]);

  const handleOverlayPlay = () => {
    if (player && typeof player.play === 'function') {
      setIsBuffering(true);
      player.play();
      return;
    }
    const w = window as unknown as { Vimeo?: VimeoGlobal };
    if (isVimeo && w?.Vimeo && iframeRef.current) {
      try {
        const p = new w.Vimeo.Player(iframeRef.current);
        p.on('play', () => {
          setShowOverlay(false);
          setIsPlaying(true);
          setIsBuffering(false);
        });
        p.on('pause', () => setIsPlaying(false));
        p.on('bufferstart', () => setIsBuffering(true));
        p.on('bufferend', () => setIsBuffering(false));
        p.on('seeked', () => setIsBuffering(false));
        p.on('timeupdate', e => {
          if (!e) return;
          setCurrentTime(e.seconds);
          if (!duration && e.duration) setDuration(e.duration);
        });
        setPlayer(p);
        setIsBuffering(true);
        p.play();
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      {isVimeo && (
        <Script src='https://player.vimeo.com/api/player.js' strategy='afterInteractive' onLoad={initVimeo} />
      )}
      <div className='bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden'>
        <div className='flex items-center justify-between p-4 border-b'>
          <div className='flex items-center space-x-2'>
            <Play className='w-5 h-5 text-blue-600' />
            <h2 className='text-xl font-bold text-gray-900'>{video.title}</h2>
          </div>
          <div className='flex items-center gap-3'>
            {onClose && (
              <button
                onClick={onClose}
                className='text-gray-400 hover:text-gray-600 text-2xl transition-colors'
              >
                <X className='w-6 h-6' />
              </button>
            )}
          </div>
        </div>

        <div className='p-6 max-h-[calc(90vh-80px)] overflow-y-auto'>
          <div className='space-y-4'>
            <div className='aspect-video bg-black rounded-lg overflow-hidden'>
              {video.videoUrl ? (
                (video.videoUrl.includes('vimeo.com') ||
                  video.videoUrl.includes('youtube.com') ||
                  video.videoUrl.includes('youtu.be')) ? (
                  <div className='relative w-full h-full'>
                    <iframe
                      src={embedSrc}
                      className='absolute top-0 left-0 w-full h-full'
                      frameBorder='0'
                      allow='autoplay; fullscreen; picture-in-picture; clipboard-write'
                      title={video.title || 'Video'}
                      allowFullScreen
                      ref={iframeRef}
                    />
                    {isVimeo && showOverlay && (
                      <button
                        onClick={handleOverlayPlay}
                        className='absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors'
                        aria-label='Play video'
                      >
                        <span className='w-16 h-16 rounded-full bg-white/90 flex items-center justify-center'>
                          <Play className='w-8 h-8 text-black' />
                        </span>
                      </button>
                    )}
                    {isVimeo && isBuffering && (
                      <div className='absolute inset-0 flex items-center justify-center bg-black/30'>
                        <div className='h-10 w-10 rounded-full border-2 border-white/70 border-t-transparent animate-spin' />
                      </div>
                    )}
                    {isVimeo && (
                      <div className='absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent'>
                        <div className='flex items-center gap-3'>
                          <button
                            onClick={() => {
                              if (!player) return;
                              if (isPlaying) player.pause();
                              else player.play();
                            }}
                            className='inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 hover:bg-white'
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                          >
                            {isPlaying ? <Pause className='w-5 h-5 text-black' /> : <Play className='w-5 h-5 text-black' />}
                          </button>
                          <input
                            type='range'
                            min={0}
                            max={duration || 0}
                            value={Math.min(currentTime, duration || 0)}
                            step={0.01}
                            onChange={e => {
                              const t = Number(e.target.value);
                              setCurrentTime(t);
                              if (player) {
                                setIsBuffering(true);
                                player.setCurrentTime(t).catch(() => {});
                              }
                            }}
                            onInput={e => {
                              const t = Number((e.target as HTMLInputElement).value);
                              setCurrentTime(t);
                              if (player) {
                                setIsBuffering(true);
                                player.setCurrentTime(t).catch(() => {});
                              }
                            }}
                            onKeyDown={e => {
                              if (!player) return;
                              if (e.key === 'ArrowRight') {
                                const delta = e.shiftKey ? 10 : 5;
                                const t = Math.max(0, Math.min((duration || 0) - 0.25, currentTime + delta));
                                setCurrentTime(t);
                                setIsBuffering(true);
                                player.setCurrentTime(t).catch(() => {});
                                e.preventDefault();
                              } else if (e.key === 'ArrowLeft') {
                                const delta = e.shiftKey ? 10 : 5;
                                const t = Math.max(0, Math.min((duration || 0) - 0.25, currentTime - delta));
                                setCurrentTime(t);
                                setIsBuffering(true);
                                player.setCurrentTime(t).catch(() => {});
                                e.preventDefault();
                              } else if (e.key === 'Home') {
                                const t = 0;
                                setCurrentTime(t);
                                setIsBuffering(true);
                                player.setCurrentTime(t).catch(() => {});
                                e.preventDefault();
                              } else if (e.key === 'End') {
                                const t = Math.max(0, (duration || 0) - 0.25);
                                setCurrentTime(t);
                                setIsBuffering(true);
                                player.setCurrentTime(t).catch(() => {});
                                e.preventDefault();
                              }
                            }}
                            aria-label='Video progress'
                            aria-valuemin={0}
                            aria-valuemax={duration || 0}
                            aria-valuenow={Math.min(currentTime, duration || 0)}
                            onMouseDown={() => {
                              setIsScrubbing(true);
                            }}
                            onMouseUp={() => {
                              const t = Math.max(0, Math.min(currentTime, Math.max(0, (duration || 0) - 0.25)));
                              setIsScrubbing(false);
                              if (player) {
                                setIsBuffering(true);
                                player.setCurrentTime(t).catch(() => {});
                              }
                            }}
                            onTouchStart={() => {
                              setIsScrubbing(true);
                            }}
                            onTouchEnd={() => {
                              const t = Math.max(0, Math.min(currentTime, Math.max(0, (duration || 0) - 0.25)));
                              setIsScrubbing(false);
                              if (player) {
                                setIsBuffering(true);
                                player.setCurrentTime(t).catch(() => {});
                              }
                            }}
                            className='flex-1 accent-yellow-400'
                          />
                          <span className='text-white text-xs tabular-nums'>
                            {formatRangeTime(currentTime)} / {formatRangeTime(duration)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <video
                    controls
                    className='w-full h-full'
                    poster={video.imageUrl || undefined}
                    preload='metadata'
                  >
                    <source src={video.videoUrl} type='video/mp4' />
                    Your browser does not support the video tag.
                  </video>
                )
              ) : (
                <div className='w-full h-full flex items-center justify-center bg-gray-900'>
                  <p className='text-white'>Video URL not available</p>
                </div>
              )}
            </div>

            <div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>{video.title}</h3>
              {video.description && <p className='text-gray-600 mb-4'>{video.description}</p>}
              <div className='mt-4 flex items-center space-x-4'>
                <span className='text-sm text-gray-500'>
                  Duration: {formatDuration(video.lengthInSeconds)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatRangeTime(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds || 0));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const mm = h > 0 ? String(m).padStart(2, '0') : String(m);
  const hh = String(h);
  const ss = String(sec).padStart(2, '0');
  return h > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`;
}

export function ReleaseVideoViewerSkeleton() {
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden'>
        <div className='flex items-center justify-between p-4 border-b'>
          <Skeleton className='h-6 w-48' />
          <Skeleton className='h-6 w-6 rounded-full' />
        </div>
        <div className='p-6'>
          <Skeleton className='aspect-video w-full mb-4' />
          <Skeleton className='h-6 w-3/4 mb-2' />
          <Skeleton className='h-4 w-full' />
        </div>
      </div>
    </div>
  );
}
