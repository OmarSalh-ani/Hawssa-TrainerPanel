'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { PhoneInput } from '@/components/ui/phone-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { signupSchema, type SignupFormData } from '@/lib/schemes/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, Mail, User, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getCountryCallingCode } from 'react-phone-number-input';

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phone, setPhone] = useState('');

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: undefined,
      phone: '',
      nationalPhoneNumber: '',
      countryCode: '',
      selectedCountry: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const { errors } = form.formState;

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    form.setValue('phone', value);
  };

  const handleNationalNumberChange = (nationalNumber: string) => {
    form.setValue('nationalPhoneNumber', nationalNumber);
  };

  const handleCountryChange = (country: string | undefined) => {
    if (country) {
      form.setValue('selectedCountry', country);
      // Get the country code with + prefix (e.g., +20 for Egypt, +964 for Iraq)
      const numericCode = getCountryCallingCode(
        country as
          | 'EG'
          | 'US'
          | 'GB'
          | 'FR'
          | 'DE'
          | 'IT'
          | 'ES'
          | 'CA'
          | 'AU'
          | 'JP'
          | 'CN'
          | 'IN'
          | 'BR'
          | 'MX'
          | 'RU'
          | 'ZA'
          | 'NG'
          | 'KE'
          | 'GH'
          | 'MA'
          | 'DZ'
          | 'TN'
          | 'LY'
          | 'SD'
          | 'ET'
          | 'UG'
          | 'TZ'
          | 'ZW'
          | 'BW'
          | 'NA'
          | 'ZM'
          | 'MW'
          | 'LS'
          | 'SZ'
          | 'MG'
          | 'MU'
          | 'SC'
          | 'KM'
          | 'YT'
          | 'RE'
          | 'MZ'
          | 'AO'
          | 'CD'
          | 'CG'
          | 'CM'
          | 'CF'
          | 'TD'
          | 'NE'
          | 'BF'
          | 'ML'
          | 'SN'
          | 'GM'
          | 'GN'
          | 'GW'
          | 'CV'
          | 'ST'
          | 'GQ'
          | 'GA'
          | 'BI'
          | 'RW'
          | 'DJ'
          | 'SO'
          | 'ER'
          | 'SS'
          | 'CF'
          | 'TD'
          | 'NE'
          | 'BF'
          | 'ML'
          | 'SN'
          | 'GM'
          | 'GN'
          | 'GW'
          | 'CV'
          | 'ST'
          | 'GQ'
          | 'GA'
          | 'BI'
          | 'RW'
          | 'DJ'
          | 'SO'
          | 'ER'
          | 'SS',
      );
      form.setValue('countryCode', `+${numericCode}`);
    }
  };

  const onSubmit = (data: SignupFormData) => {
    console.log('Signup data:', data);
    // Handle signup logic here
  };

  return (
    <div className='w-full max-w-3dxl mx-auto'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          {/* Name Fields */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-medium text-gray-700'>First Name *</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <User className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-500' />
                      <Input
                        placeholder='Enter your first name'
                        className='pl-10 h-12 border-gray-300 focus:ring-yellow-500 focus:border-yellow-500'
                        error={!!errors.firstName}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-medium text-gray-700'>Last Name *</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <User className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-500' />
                      <Input
                        placeholder='Enter your last name'
                        className='pl-10 h-12 border-gray-300 focus:ring-yellow-500 focus:border-yellow-500'
                        error={!!errors.lastName}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Birth Date and Gender */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
            <FormField
              control={form.control}
              name='birthDate'
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

            <FormField
              control={form.control}
              name='gender'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-medium text-gray-700 '>Gender *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={`h-12 w-full ${
                          errors.gender
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:ring-yellow-500 focus:border-yellow-500'
                        }`}
                      >
                        <div className='flex items-center'>
                          <Users className='h-4 w-4 text-yellow-500 mr-2' />
                          <SelectValue placeholder='Select your gender' />
                        </div>
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
          </div>
          <div className=' w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Phone Number */}
            <FormField
              control={form.control}
              name='phone'
              render={() => (
                <FormItem>
                  <FormLabel className='text-sm font-medium text-gray-700'>
                    Phone Number *
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      placeholder='Enter your phone number'
                      className='h-12 border-gray-300 w-full'
                      value={phone}
                      onChange={handlePhoneChange}
                      onCountryChange={handleCountryChange}
                      onNationalNumberChange={handleNationalNumberChange}
                      defaultCountry='EG'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-medium text-gray-700'>Email *</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-500' />
                      <Input
                        placeholder='Enter your email'
                        type='email'
                        className='pl-10 h-12 border-gray-300 focus:ring-yellow-500 focus:border-yellow-500'
                        error={!!errors.email}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Password Fields */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-medium text-gray-700'>Password *</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-500' />
                      <Input
                        placeholder='Create a password'
                        type={showPassword ? 'text' : 'password'}
                        className='pl-10 pr-10 h-12 border-gray-300 focus:ring-yellow-500 focus:border-yellow-500'
                        error={!!errors.password}
                        {...field}
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-500 hover:text-yellow-600'
                      >
                        {showPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-medium text-gray-700'>
                    Confirm Password *
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-500' />
                      <Input
                        placeholder='Confirm your password'
                        type={showConfirmPassword ? 'text' : 'password'}
                        className='pl-10 pr-10 h-12 border-gray-300 focus:ring-yellow-500 focus:border-yellow-500'
                        error={!!errors.confirmPassword}
                        {...field}
                      />
                      <button
                        type='button'
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-500 hover:text-yellow-600'
                      >
                        {showConfirmPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Terms and Conditions */}
          <div className='flex items-start space-x-3'>
            <Checkbox
              id='terms'
              className='mt-1 border-gray-300 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500'
            />
            <label htmlFor='terms' className='text-sm text-gray-700'>
              I agree to the{' '}
              <Link to='#' className='text-yellow-600 hover:text-yellow-500 underline'>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to='#' className='text-yellow-600 hover:text-yellow-500 underline'>
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type='submit'
            className='w-full h-12 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg text-lg transition-colors'
          >
            Create Trainer Account
          </Button>
        </form>
      </Form>

      <div className='mt-6 text-center'>
        <p className='text-sm text-gray-600'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='font-medium text-yellow-600 hover:text-yellow-500 underline underline-offset-4'
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
