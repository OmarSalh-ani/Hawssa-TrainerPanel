import { Button } from '@/components/ui/button';
import DatePicker from '@/components/ui/date-picker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateProfile } from '@/hooks/profile';
import { Profile } from '@/lib/types/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const GOVERNMENTS = [
  { id: 1, name: 'Cairo' },
  { id: 2, name: 'Alexandria' },
];
const CITIES = [
  { id: 1, name: 'Nasr City' },
  { id: 2, name: '6th October' },
];

const ProfileUpdateSchema = z.object({
  FullName: z.string('Full Name is required').min(2).max(64),
  BirthDate: z.string().min(4),
  MobileNumber: z.string('Mobile Number is required').min(6),
  Email: z.string('Email is required').email(),
  IsMale: z.boolean('Gender is required'),
  ProfileImage: z.instanceof(File, { message: 'Profile Image is required' }),
  GymName: z.string('Gym Name is required').min(2),
  GymMobileNumber: z.string('Gym Mobile Number is required').min(6),
  GoogleMapsUrl: z.string('Google Maps URL is required').url().optional().or(z.literal('')),
  GymAddress: z.string('Gym Address is required').min(2),
  GovernmentId: z.number('Government is required'),
  CityId: z.number('City is required'),
});

type ProfileUpdateSchemaType = z.infer<typeof ProfileUpdateSchema>;

interface ProfileUpdateFormProps {
  profile: Profile;
  onUpdated: () => void;
}

export default function ProfileUpdateForm({ profile, onUpdated }: ProfileUpdateFormProps) {
  const [filePreview, setFilePreview] = useState<string | null>(profile.imageUrl || null);
  const form = useForm<ProfileUpdateSchemaType>({
    resolver: zodResolver(ProfileUpdateSchema),
    defaultValues: {
      FullName: profile.fullName,
      BirthDate: profile.birthDate.split('T')[0],
      MobileNumber: profile.mobileNumber,
      Email: profile.email,
      IsMale: profile.isMale,
      ProfileImage: undefined,
      GymName: profile.gym.gymName,
      GymMobileNumber: profile.gym.mobileNumber,
      GoogleMapsUrl: profile.gym.googleMapsUrl || '',
      GymAddress: profile.gym.address,
      GovernmentId: Number(profile.gym.governmentId) || GOVERNMENTS[0].id,
      CityId: Number(profile.gym.cityId) || CITIES[0].id,
    },
  });
  const updateProfile = useUpdateProfile('en');

  function onSubmit(values: ProfileUpdateSchemaType) {
    updateProfile.mutate(
      {
        ...values,
        ProfileImage:
          typeof values.ProfileImage === 'object' &&
          values.ProfileImage instanceof FileList &&
          values.ProfileImage.length > 0
            ? values.ProfileImage[0]
            : undefined,
        GoogleMapsUrl: values.GoogleMapsUrl ?? '',
      },
      { onSuccess: onUpdated },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='FullName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete='name' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='Email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input {...field} type='email' autoComplete='email' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='MobileNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number *</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete='tel' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='BirthDate'
            render={({ field }) => (
              <FormItem className=''>
                <FormLabel className='text-sm font-medium text-gray-700'>Birth Date *</FormLabel>
                <FormControl>
                  <DatePicker field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='IsMale'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender *</FormLabel>
              <Select
                value={field.value ? 'male' : 'female'}
                onValueChange={v => field.onChange(v === 'male')}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select gender' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='male'>Male</SelectItem>
                  <SelectItem value='female'>Female</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='ProfileImage'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <Input
                  type='file'
                  accept='image/*'
                  onChange={evt => {
                    field.onChange(evt.target.files);
                    if (evt.target.files && evt.target.files.length > 0) {
                      setFilePreview(URL.createObjectURL(evt.target.files[0]));
                    } else {
                      setFilePreview(null);
                    }
                  }}
                />
              </FormControl>
              {filePreview && (
                <Image
                  src={filePreview}
                  alt='profile preview'
                  width={64}
                  height={64}
                  className='rounded w-16 h-16 mt-2 object-cover'
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <h3 className='pt-2 font-semibold'>Gym Info</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='GymName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gym Name *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='GymMobileNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gym Mobile Number *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='GoogleMapsUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Google Maps URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='GymAddress'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gym Address *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='GovernmentId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Government *</FormLabel>
                <Select
                  value={String(field.value)}
                  onValueChange={val => field.onChange(Number(val))}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {GOVERNMENTS.map(g => (
                      <SelectItem key={g.id} value={String(g.id)}>
                        {g.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='CityId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>City *</FormLabel>
                <Select
                  value={String(field.value)}
                  onValueChange={val => field.onChange(Number(val))}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CITIES.map(c => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' disabled={updateProfile.status === 'pending'}>
          {updateProfile.status === 'pending' ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </Form>
  );
}
