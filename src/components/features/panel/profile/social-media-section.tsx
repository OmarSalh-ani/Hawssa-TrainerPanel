'use client';
import { Input } from '@/components/ui/input';
import { useProfile } from '@/hooks/profile';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function SocialMediaSection() {
  const { data } = useProfile('en');
  const social = data?.data?.social;

  if (!social) {
    return null;
  }

  const socialLinks = [
    {
      name: 'Facebook',
      value: social.facebook,
      icon: Facebook,
      color: 'text-blue-600',
    },
    {
      name: 'Instagram',
      value: social.instagram,
      icon: Instagram,
      color: 'text-pink-600',
    },
    {
      name: 'TikTok',
      value: social.tiktok,
      icon: Youtube,
      color: 'text-black',
    },
    {
      name: 'Snapchat',
      value: social.snapchat,
      icon: Instagram,
      color: 'text-yellow-500',
    },
    {
      name: 'Twitter',
      value: social.twitter,
      icon: Twitter,
      color: 'text-blue-400',
    },
  ];

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
      {/* Section Header */}
      <div className='flex items-center gap-3 mb-6'>
        <div className='w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center'>
          <Instagram className='w-4 h-4 text-black' />
        </div>
        <h2 className='text-xl font-semibold text-gray-800'>Social Media</h2>
      </div>

      {/* Social Media Links */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {socialLinks.map(socialLink => {
          const Icon = socialLink.icon;
          return (
            <div key={socialLink.name} className='space-y-2'>
              <label className='text-sm font-medium text-gray-700 flex items-center gap-2'>
                <Icon className={`w-4 h-4 ${socialLink.color}`} />
                {socialLink.name}
              </label>
              <Input
                className='w-full'
                value={socialLink.value || ''}
                readOnly
                placeholder={`No ${socialLink.name} link`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
