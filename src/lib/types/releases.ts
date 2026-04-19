// Release API Types
export interface Release {
  id: number;
  title: string;
  description: string;
  /** Localized song title when set on the release (API: songName). */
  songName?: string | null;
  imageUrl: string;
  releaseDate: string;
  videosCount: number;
  /** True when the trainer must purchase full library access to open this release. */
  isLocked?: boolean;
}

export interface ReleaseVideo {
  videoId: number;
  title: string;
  description: string;
  songName?: string | null;
  SongName?: string | null;
  /** Employee who uploaded / created the video (API: choreographyName). */
  choreographyName?: string | null;
  ChoreographyName?: string | null;
  imageUrl: string;
  lengthInSeconds: number;
  videoUrl: string;
  vimeoId?: string | number;
  VimeoId?: string | number;
  ViemoId?: string | number;
}

export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

// API Request Types
export interface GetReleasesRequest {
  page: number;
  pageSize: number;
}

// API Response Types
export interface GetReleasesResponse {
  pagination: Pagination;
  items: Release[];
  hasFullLibraryAccess?: boolean;
}

export interface GetReleaseVideosResponse {
  releaseId: number;
  title: string;
  description: string;
  songName?: string | null;
  imageUrl: string;
  videos: ReleaseVideo[];
}

// API Error Response Type
export interface ReleaseApiErrorResponse {
  message: string;
  errors: Record<string, string | string[]>;
}
