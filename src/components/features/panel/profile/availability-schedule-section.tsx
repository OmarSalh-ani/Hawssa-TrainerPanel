'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useProfile } from '@/hooks/profile';
import { Calendar, Clock } from 'lucide-react';

const dayNumberToName: Record<number, string> = {
  1: 'Saturday',
  2: 'Sunday',
  3: 'Monday',
  4: 'Tuesday',
  5: 'Wednesday',
  6: 'Thursday',
  7: 'Friday',
};

export default function AvailabilityScheduleSection() {
  const { data } = useProfile('en');
  const availabilities = data?.data?.gym?.availabilities;
  console.log(data);
  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
      <div className='flex items-center gap-3 mb-6'>
        <div className='w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center'>
          <Calendar className='w-4 h-4 text-black' />
        </div>
        <h2 className='text-xl font-semibold text-gray-800'>Availability & Schedule</h2>
      </div>
      <div className='space-y-4'>
        {availabilities?.map(avail => (
          <div
            key={avail.dayNumber}
            className='flex items-center gap-4 p-4 border border-gray-200 rounded-lg'
          >
            <Checkbox checked={avail.isActive} className='w-5 h-5' disabled />
            <div className='w-24 text-sm font-medium text-gray-700'>
              {avail.dayName ?? dayNumberToName[avail.dayNumber]}
            </div>
            <div className='flex items-center gap-2 flex-1'>
              <div className='relative flex-1'>
                <Clock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                <Input
                  value={avail.startTime}
                  className='pl-10'
                  readOnly
                  disabled={!avail.isActive}
                />
              </div>
              <span
                className={`text-lg font-bold ${
                  avail.isActive ? 'text-yellow-500' : 'text-gray-400'
                }`}
              >
                -
              </span>
              <div className='relative flex-1'>
                <Clock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                <Input
                  value={avail.endTime}
                  className='pl-10'
                  readOnly
                  disabled={!avail.isActive}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
