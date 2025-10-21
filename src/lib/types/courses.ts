// Course API Types
export interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  videosCount: number;
  uploadDate: string;
  progressPercent: number;
  status: 'Not Started' | 'In Progress' | 'Completed';
  isLocked: boolean;
}

export interface CourseContent {
  id: number;
  isVideo: boolean;
  image: string | null;
  title: string;
  description: string;
  lengthInMinutes: number;
  watchedMinutes: number;
  status: 'Not Started' | 'In Progress' | 'Completed';
}

export interface ArticleContent {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface VideoContent {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  url: string;
}

export interface CourseDetails {
  id: number;
  title: string;
  description: string;
  image: string;
  videosCount: number;
  articlesCount: number;
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

// API Request Types
export interface GetCoursesRequest {
  pageNumber: number;
  pageSize: number;
}

// API Response Types
export interface GetCoursesResponse {
  courses: Course[];
  pagination: Pagination;
}

export interface GetCourseContentResponse {
  course: CourseDetails;
  contents: CourseContent[];
}

export interface GetArticleContentResponse {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface GetVideoContentResponse {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  url: string;
}

// API Error Response Type
export interface CourseApiErrorResponse {
  message: string;
  errors: Record<string, string | string[]>;
}
