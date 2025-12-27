'use client';
import ProfileSkeleton from '@/components/features/panel/profile/profile-skeleton';
import { useProfile } from '@/hooks/profile';
import AvailabilityScheduleSection from './availability-schedule-section';
import GymDetailsSection from './gym-details-section';
import ProfileBanner from './profile-banner';
import SocialMediaSection from './social-media-section';
import TrainerInformationSection from './trainer-information-section';
export default function ProfileContent() {
  const { data, isLoading, error } = useProfile('en');
  const profile = data?.data;

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center p-8'>
        <div className='bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full'>
          <h2 className='text-xl font-semibold text-red-800 mb-2'>Error Loading Profile</h2>
          <p className='text-red-600'>
            {error instanceof Error
              ? error.message
              : 'Failed to load profile data. Please try again later.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className='mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className='min-h-screen flex items-center justify-center p-8'>
        <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md w-full'>
          <h2 className='text-xl font-semibold text-yellow-800 mb-2'>No Profile Data</h2>
          <p className='text-yellow-600'>Profile data is not available. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      {/* Profile Banner */}
      <ProfileBanner />

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-6 py-8 space-y-8'>
        {/* Trainer Information */}
        <TrainerInformationSection />

        {/* Social Media */}
        <SocialMediaSection />

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
