// Home API Types
export interface HomeData {
  trainerImage: string | null;
  trainerFullName: string;
  subscription: Subscription | null;
  coursesProgress: CoursesProgress;
  profileViews: number;
  lastCourseProgress: LastCourseProgress;
  lastCourses: LastCourse[];
}

export interface Subscription {
  id: number;
  title: string;
  status: 'Active' | 'Not Active';
  statusColor: string;
  expirationDate: string;
  daysRemaining: number;
  message: string;
  buttonText: string;
  buttonColor: string;
}

export interface CoursesProgress {
  coursesCount: number;
  overallProgressPercent: number;
}

export interface LastCourseProgress {
  courseName: string;
  completePercent: number;
  lastAccessTime: string;
  hoursRemaining: number;
  status: 'Not Started' | 'In Progress' | 'Completed';
}

export interface LastCourse {
  id: number;
  title: string;
  description: string;
  image: string;
  uploadDate: string;
}

// API Response Types
export interface GetHomeResponse {
  trainerImage: string | null;
  trainerFullName: string;
  subscription: Subscription | null;
  coursesProgress: CoursesProgress;
  profileViews: number;
  lastCourseProgress: LastCourseProgress;
  lastCourses: LastCourse[];
}

// API Error Response Type
export interface HomeApiErrorResponse {
  message: string;
  errors: Record<string, string | string[]>;
}
