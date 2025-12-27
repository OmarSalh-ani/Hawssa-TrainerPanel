import { Input } from '@/components/ui/input';
import { useProfile } from '@/hooks/profile';
import { Building2 } from 'lucide-react';

export default function GymDetailsSection() {
  const { data } = useProfile('en');
  const gym = data?.data?.gym;

  if (!gym) {
    return (
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        {/* Section Header */}
        <div className='flex items-center gap-3 mb-6'>
          <div className='w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center'>
            <Building2 className='w-4 h-4 text-black' />
          </div>
          <h2 className='text-xl font-semibold text-gray-800'>Gym Details</h2>
        </div>
        {/* No Gym Message */}
        <div className='text-center py-8'>
          <p className='text-gray-500 text-sm'>No gym information available</p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
      {/* Section Header */}
      <div className='flex items-center gap-3 mb-6'>
        <div className='w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center'>
          <Building2 className='w-4 h-4 text-black' />
        </div>
        <h2 className='text-xl font-semibold text-gray-800'>Gym Details</h2>
      </div>
      {/* Gym fields UI */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Gym Name */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-gray-700'>
            Gym Name <span className='text-red-500'>*</span>
          </label>
          <Input className='w-full' value={gym?.gymName || ''} readOnly />
        </div>
        {/* Mobile Number */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-gray-700'>
            Mobile Number <span className='text-red-500'>*</span>
          </label>
          <Input className='w-full' value={gym?.mobileNumber || ''} readOnly />
        </div>
        {/* Address */}
        <div className='space-y-2 md:col-span-2'>
          <label className='text-sm font-medium text-gray-700'>
            Address <span className='text-red-500'>*</span>
          </label>
          <Input className='w-full' value={gym?.address || ''} readOnly />
        </div>
        {/* Google Maps URL */}
        <div className='space-y-2 md:col-span-2'>
          <label className='text-sm font-medium text-gray-700'>Google Maps Url</label>
          <Input className='w-full' value={gym?.googleMapsUrl ?? ''} readOnly />
        </div>
      </div>
    </div>
  );
}
