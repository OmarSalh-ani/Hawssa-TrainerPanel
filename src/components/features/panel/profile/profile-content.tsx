'use client';
import ProfileSkeleton from '@/components/features/panel/profile/profile-skeleton';
import { useProfile } from '@/hooks/profile';
import AvailabilityScheduleSection from './availability-schedule-section';
import GymDetailsSection from './gym-details-section';
import ProfileBanner from './profile-banner';
import TrainerInformationSection from './trainer-information-section';
export default function ProfileContent() {
  const { data, isLoading } = useProfile('en');
  console.log(data);
  const profile = data?.data;
  console.log(profile);

  if (isLoading) {
    return <ProfileSkeleton />;
  }
  return (
    <div className='min-h-screen'>
      {/* Profile Banner */}
      <ProfileBanner />

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-6 py-8 space-y-8'>
        {/* Trainer Information */}
        <TrainerInformationSection />

        {/* Location Details */}
        {/* <LocationDetailsSection/> */}

        {/* Gym Details */}
        <GymDetailsSection />

        {/* Availability & Schedule */}
        <AvailabilityScheduleSection />
      </div>
    </div>
  );
}
