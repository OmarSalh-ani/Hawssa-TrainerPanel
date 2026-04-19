// Home dashboard — shapes match GET /api/{lang}/home

export interface HomeSubscriptionInfo {
  subscriptionName: string;
  daysToEnd: number;
  /** ISO date from API */
  endDate: string;
}

export interface HomeCoursesProgress {
  coursesCount: number;
  overallProgressPercent: number;
}

export interface HomeLastCourseProgress {
  courseName: string;
  completePercent: number;
  lastAccessTime: string;
  hoursRemaining: number;
  status: string;
}

export interface HomeLastCourse {
  id: number;
  title: string;
  description: string;
  image: string | null;
  uploadDate: string;
}

export interface GetHomeResponse {
  trainerImage: string | null;
  trainerFullName: string;
  subscription: HomeSubscriptionInfo | null;
  coursesProgress: HomeCoursesProgress;
  profileViews: number;
  lastCourseProgress: HomeLastCourseProgress | null;
  lastCourses: HomeLastCourse[];
}

/** Alias for dashboard payload */
export type HomeData = GetHomeResponse;

// API Error Response Type
export interface HomeApiErrorResponse {
  message: string;
  errors: Record<string, string | string[]>;
}
