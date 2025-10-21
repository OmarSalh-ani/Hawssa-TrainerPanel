'use client';

import { CertificateData } from '@/lib/data/engagement';
import { AlertCircle, Award, XCircle } from 'lucide-react';

interface CertificateStatusCardProps {
  data: CertificateData;
}

export default function CertificateStatusCard({ data }: CertificateStatusCardProps) {
  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center space-x-2'>
          <div
            className='w-8 h-8 rounded-full flex items-center justify-center'
            style={{ backgroundColor: data.statusColor + '20' }}
          >
            <Award className='w-4 h-4' style={{ color: data.statusColor }} />
          </div>
          <h3 className='text-lg font-semibold text-gray-900'>{data.title}</h3>
        </div>
        <div className='flex items-center space-x-2'>
          <XCircle className='w-5 h-5' style={{ color: data.statusColor }} />
          <span className='text-sm font-medium' style={{ color: data.statusColor }}>
            {data.status}
          </span>
        </div>
      </div>

      {/* Expiration Info */}
      <div className='mb-4'>
        <p className='text-sm text-gray-600 mb-1'>Your certificate expired on:</p>
        <p className='text-lg font-medium text-gray-900'>{data.expirationDate}</p>
      </div>

      {/* Message with Icon */}
      <div className='flex items-start space-x-3 mb-6'>
        <div className='flex-shrink-0'>
          <div className='w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center'>
            <AlertCircle className='w-4 h-4 text-purple-600' />
          </div>
        </div>
        <p className='text-sm text-gray-700 leading-relaxed'>{data.message}</p>
      </div>

      {/* Action Buttons */}
      <div className='flex space-x-3'>
        <button className='flex-1 py-3 px-4 bg-white border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors'>
          {data.downloadButtonText}
        </button>
        <button
          className='flex-1 py-3 px-4 rounded-lg font-medium text-gray-900 transition-colors hover:opacity-90'
          style={{ backgroundColor: data.renewButtonColor }}
        >
          {data.renewButtonText}
        </button>
      </div>
    </div>
  );
}
