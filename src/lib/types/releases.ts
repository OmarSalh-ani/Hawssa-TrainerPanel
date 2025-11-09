// Release API Types
export interface Release {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  releaseDate: string;
  videosCount: number;
}

export interface ReleaseVideo {
  videoId: number;
  title: string;
  description: string;
  imageUrl: string;
  lengthInSeconds: number;
  videoUrl: string;
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
}

export interface GetReleaseVideosResponse {
  releaseId: number;
  title: string;
  description: string;
  imageUrl: string;
  videos: ReleaseVideo[];
}

// API Error Response Type
export interface ReleaseApiErrorResponse {
  message: string;
  errors: Record<string, string | string[]>;
}
