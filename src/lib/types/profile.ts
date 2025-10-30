// API Types for Profile
export interface Profile {
  id: number;
  fullName: string;
  birthDate: string;
  imageUrl: string | null;
  mobileNumber: string;
  email: string;
  gender: string;
  isMale: boolean;
  gym: ProfileGym;
}

export interface ProfileGym {
  id: number;
  gymName: string;
  mobileNumber: string;
  address: string;
  googleMapsUrl: string;
  governmentId: number;
  cityId: number;
  availabilities: ProfileAvailability[];
}

export interface ProfileAvailability {
  dayNumber: number;
  dayName: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

// export interface ProfileApiResponse {
//   success: boolean;
//   message: string;
//   data: Profile;
// }

export interface ProfileUpdateRequest {
  FullName: string;
  BirthDate: string;
  MobileNumber: string;
  Email: string;
  IsMale: boolean;
  ProfileImage?: File | null;
  GymName: string;
  GymMobileNumber: string;
  GoogleMapsUrl: string;
  GymAddress: string;
  GovernmentId: number;
  CityId: number;

}

export interface ProfileAvailabilityUpdateRequest {
  // Availability Fields:
  SaturdayIsActive: boolean;
  SaturdayStartTime: string;
  SaturdayEndTime: string;
  SundayIsActive: boolean;
  SundayStartTime: string;
  SundayEndTime: string;
  MondayIsActive: boolean;
  MondayStartTime: string;
  MondayEndTime: string;
  TuesdayIsActive: boolean;
  TuesdayStartTime: string;
  TuesdayEndTime: string;
  WednesdayIsActive: boolean;
  WednesdayStartTime: string;
  WednesdayEndTime: string;
  ThursdayIsActive: boolean;
  ThursdayStartTime: string;
  ThursdayEndTime: string;
  FridayIsActive: boolean;
  FridayStartTime: string;
  FridayEndTime: string;
}
