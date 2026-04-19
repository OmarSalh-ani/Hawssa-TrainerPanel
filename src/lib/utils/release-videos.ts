import type { ReleaseVideo } from '@/lib/types/releases';

/** API may send camelCase or PascalCase for optional fields. */
export function getReleaseVideoSongName(video: ReleaseVideo): string | null {
  const raw = video.songName ?? video.SongName;
  if (raw == null) return null;
  const s = String(raw).trim();
  return s.length > 0 ? s : null;
}

export function getReleaseVideoChoreographyName(video: ReleaseVideo): string | null {
  const raw = video.choreographyName ?? video.ChoreographyName;
  if (raw == null) return null;
  const s = String(raw).trim();
  return s.length > 0 ? s : null;
}
