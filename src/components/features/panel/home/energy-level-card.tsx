'use client';

import { TrendingUp } from 'lucide-react';

interface EnergyLevelCardProps {
  data: {
    id: number;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    iconColor: string;
    currentLevel: number;
    changePercentage: number;
    changeType: 'increase' | 'decrease';
    weeklyGoal: number;
    aboveTarget: number;
  };
}

export default function EnergyLevelCard({ data }: EnergyLevelCardProps) {
  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
      {/* Header */}
      <div className='flex items-start justify-between mb-6'>
        <div className='flex-1'>
          <h3 className='text-lg font-semibold text-gray-900 mb-1'>{data.title}</h3>
          <p className='text-sm text-gray-600'>{data.description}</p>
        </div>
        <div
          className='w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0'
          style={{ backgroundColor: data.iconColor }}
        >
          <data.icon className='w-6 h-6' />
        </div>
      </div>

      {/* Main Metric */}
      <div className='mb-6'>
        <div className='text-5xl font-bold text-gray-900 mb-2'>{data.currentLevel}%</div>
        <div className='flex items-center gap-1'>
          <TrendingUp size={16} className='text-green-500' />
          <span className='text-sm text-green-500 font-medium'>
            ▲{data.changePercentage}% high energy
          </span>
        </div>
      </div>

      {/* Progress Section */}
      <div className='space-y-3'>
        <div className='flex justify-between items-center'>
          <span className='text-sm font-medium text-gray-900'>Weekly goal: {data.weeklyGoal}%</span>
        </div>

        {/* Progress Bar */}
        <div className='relative'>
          <div className='w-full bg-gray-200 rounded-full h-3'>
            <div
              className='h-3 rounded-full transition-all duration-500'
              style={{
                width: `${data.currentLevel}%`,
                backgroundColor: data.iconColor,
              }}
            />
          </div>
        </div>

        {/* Target Achievement */}
        <div className='flex justify-end'>
          <span className='text-sm text-gray-500'>+{data.aboveTarget}% above target</span>
        </div>
      </div>
    </div>
  );
}
