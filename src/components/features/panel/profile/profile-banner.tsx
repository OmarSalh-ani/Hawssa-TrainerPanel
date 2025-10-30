'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useProfile } from '@/hooks/profile';
import { Edit } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import ProfileAvailabilityForm from './profile-availability-form';
import ProfileUpdateForm from './profile-update-form';

export default function ProfileBanner() {
  const { data, refetch } = useProfile('en');
  const profile = data?.data;
  const [openProfile, setOpenProfile] = useState(false);
  const [openAvailability, setOpenAvailability] = useState(false);

  return (
    <div className='relative bg-gradient-to-r from-[#D7582B] to-[#C9633F] py-8 px-24'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute top-4 left-8 w-16 h-16 bg-white rounded-full'></div>
        <div className='absolute top-12 right-12 w-8 h-8 bg-white rounded-full'></div>
        <div className='absolute bottom-8 left-1/4 w-12 h-12 bg-white rounded-full'></div>
        <div className='absolute bottom-4 right-1/3 w-6 h-6 bg-white rounded-full'></div>
      </div>
      <div className='relative z-10 flex items-center gap-6'>
        {/* Profile Picture */}
        <div className='relative'>
          <div className='w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center'>
            <div className='w-16 h-16 bg-white rounded-full flex items-center justify-center'>
              <Image
                src={profile?.imageUrl ?? ''}
                alt={profile?.fullName ?? ''}
                width={64}
                height={64}
                className='object-cover'
              />
            </div>
          </div>
        </div>
        {/* Profile Info */}
        <div className='text-white '>
          <h1 className='text-3xl font-bold mb-2'>{profile?.fullName}</h1>
          <p className='text-lg opacity-90'>{profile?.email}</p>
        </div>
      </div>
      {/* Action Buttons */}
      <div className='relative z-10 flex justify-center gap-4 mt-6'>
        <Button
          className='bg-yellow-400 text-black border border-black hover:bg-yellow-300 px-6 py-2'
          onClick={() => setOpenProfile(true)}
        >
          <Edit className='w-4 h-4 mr-2' />
          Change Data
        </Button>
        <Button
          className='bg-yellow-400 text-black border border-black hover:bg-yellow-300 px-6 py-2'
          onClick={() => setOpenAvailability(true)}
        >
          <Edit className='w-4 h-4 mr-2' />
          Change Availability
        </Button>
      </div>
      {/* Profile Update Modal */}
      <Dialog open={openProfile} onOpenChange={setOpenProfile}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          {/* Pass defaults safely */}
          {profile && (
            <ProfileUpdateForm
              profile={profile}
              onUpdated={() => {
                setOpenProfile(false);
                refetch();
              }}
            />
          )}
        </DialogContent>
      </Dialog>
      {/* Profile Availability Modal */}
      <Dialog open={openAvailability} onOpenChange={setOpenAvailability}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Update Availability</DialogTitle>
          </DialogHeader>
          {profile && profile.gym.availabilities && (
            <ProfileAvailabilityForm
              availabilities={profile.gym.availabilities}
              onUpdated={() => {
                setOpenAvailability(false);
                refetch();
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
