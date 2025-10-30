'use client';
import { Input } from '@/components/ui/input';
import { useProfile } from '@/hooks/profile';
import { User } from 'lucide-react';

export default function TrainerInformationSection() {
    const { data } = useProfile('en');
  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
      {/* Section Header */}
      <div className='flex items-center gap-3 mb-6'>
        <div className='w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center'>
          <User className='w-4 h-4 text-black' />
        </div>
        <h2 className='text-xl font-semibold text-gray-800'>Trainer Information</h2>
      </div>

      {/* Form Fields */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Trainer Name */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-gray-700'>
            Trainer Name <span className='text-red-500'>*</span>
          </label>
          <Input defaultValue={data?.data?.fullName} className='w-full' readOnly />
        </div>

        {/* email */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-gray-700'>
            Email <span className='text-red-500'>*</span>
          </label>
          <Input defaultValue={data?.data?.email} className='w-full' readOnly />
        </div>

        {/* Mobile Number */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-gray-700'>
            Mobile Number <span className='text-red-500'>*</span>
          </label>
          <Input defaultValue={data?.data?.mobileNumber} className='w-full' readOnly />
        </div>

        {/* gender */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-gray-700'>
            Gender <span className='text-red-500'>*</span>
          </label>
          <Input
            defaultValue={data?.data?.isMale ? 'Male' : 'Female'}
            className='w-full'
            readOnly
          />
        </div>

        {/* birth date */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-gray-700'>
            Birth Date <span className='text-red-500'>*</span>
          </label>
          <Input defaultValue={data?.data?.birthDate.split('T')[0]} className='w-full' readOnly />
        </div>

        {/* <div className='space-y-2 md:col-span-2'>
          <label className='text-sm font-medium text-gray-700'>
            Professional Description <span className='text-red-500'>*</span>
          </label>
          <textarea
            defaultValue='Certified personal trainer with over 5 years of experience helping clients achieve their fitness goals. Specializing in strength training, weight loss, and functional movement. I believe in creating personalized workout plans that fit your lifestyle and help you build sustainable healthy habits.'
            className='w-full h-32 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-yellow-500'
          />
        </div> */}
      </div>
    </div>
  );
}
