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
import { registerStep1 } from '@/lib/apis/auth/auth';
import type { RegistrationStep1Request } from '@/lib/types/auth';
import { registrationStep1Schema, type RegistrationStep1Data } from '@/lib/schemes/auth';
import { setToken } from '@/lib/utils/cookie';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, Mail, User, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const step1Form = useForm<RegistrationStep1Data>({
    resolver: zodResolver(registrationStep1Schema),
    defaultValues: {
      fullName: '',
      mobileNumber: '',
      email: '',
      birthDate: '',
      isMale: true,
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    mode: 'onChange',
  });

  const { errors: step1Errors } = step1Form.formState;

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    step1Form.setValue('mobileNumber', value);
  };

  const handleStep1Submit = async (data: RegistrationStep1Data) => {
    setIsLoading(true);
    try {
      const { acceptTerms: _acceptTerms, ...registrationFields } = data;
      const formattedData = {
        ...registrationFields,
        birthDate: new Date(data.birthDate).toISOString(),
      } satisfies RegistrationStep1Request;

      const response = await registerStep1(formattedData);

      if (!response.success || !response.data?.token) {
        toast.error(response.message || 'Registration failed. Please try again.');
        return;
      }

      setToken(response.data.token);
      toast.success(response.message || 'Registration successful');
      navigate('/');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full max-w-3xl mx-auto'>
      <div className='mb-8'>
        <div className='flex items-center justify-center space-x-4'>
          <div className='flex items-center space-x-2 text-yellow-600'>
            <div className='w-8 h-8 rounded-full flex items-center justify-center bg-yellow-500 text-white'>
              1
            </div>
            <span className='text-sm font-medium'>Registration</span>
          </div>
        </div>
      </div>

      <Form {...step1Form}>
        <form onSubmit={step1Form.handleSubmit(handleStep1Submit)} className='space-y-4'>
          <FormField
            control={step1Form.control}
            name='fullName'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm font-medium text-gray-700'>Full Name *</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <User className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-500' />
                    <Input
                      placeholder='Enter your full name'
                      className='pl-10 h-12 border-gray-300 focus:ring-yellow-500 focus:border-yellow-500'
                      error={!!step1Errors.fullName}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormField
              control={step1Form.control}
              name='mobileNumber'
              render={() => (
                <FormItem>
                  <FormLabel className='text-sm font-medium text-gray-700'>
                    Mobile Number *
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      placeholder='Enter your mobile number'
                      className='h-12 border-gray-300 w-full'
                      value={phone}
                      onChange={handlePhoneChange}
                      defaultCountry='EG'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={step1Form.control}
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
                        error={!!step1Errors.email}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormField
              control={step1Form.control}
              name='birthDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-medium text-gray-700'>
                    Birth Date *
                  </FormLabel>
                  <FormControl>
                    <DatePicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={step1Form.control}
              name='isMale'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-medium text-gray-700'>Gender *</FormLabel>
                  <Select
                    onValueChange={value => field.onChange(value === 'true')}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`h-12 w-full ${
                          step1Errors.isMale
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
                      <SelectItem value='true'>Male</SelectItem>
                      <SelectItem value='false'>Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormField
              control={step1Form.control}
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
                        error={!!step1Errors.password}
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
              control={step1Form.control}
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
                        error={!!step1Errors.confirmPassword}
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

          <FormField
            control={step1Form.control}
            name='acceptTerms'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-start space-x-3'>
                  <FormControl>
                    <Checkbox
                      id='terms'
                      checked={field.value}
                      onCheckedChange={checked => field.onChange(checked === true)}
                      className='mt-1 border-gray-300 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500'
                    />
                  </FormControl>
                  <label htmlFor='terms' className='text-sm text-gray-700 leading-snug'>
                    I agree to the{' '}
                    <Link
                      to='https://www.hawssa.net/terms-and-conditions'
                      className='text-yellow-600 hover:text-yellow-500 underline'
                    >
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link
                      to='https://www.hawssa.net/privacy-policy'
                      className='text-yellow-600 hover:text-yellow-500 underline'
                    >
                      Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link
                      to='https://www.hawssa.net/instructor-agreement'
                      className='text-yellow-600 hover:text-yellow-500 underline'
                    >
                      Instructor Agreement
                    </Link>
                  </label>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            disabled={isLoading || !step1Form.watch('acceptTerms')}
            className='w-full h-12 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg text-lg transition-colors disabled:opacity-50'
          >
            {isLoading ? 'Submitting...' : 'Create account'}
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
