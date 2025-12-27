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
import OTPInput from '@/components/ui/otp-input';
import { PhoneInput } from '@/components/ui/phone-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { registerStep1, verifyRegistrationOTP } from '@/lib/apis/auth/auth';
import {
  registrationStep1Schema,
  registrationStep2Schema,
  type RegistrationStep1Data,
  type RegistrationStep2Data,
} from '@/lib/schemes/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, CheckCircle, Eye, EyeOff, Lock, Mail, User, Users } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [registrationEmail, setRegistrationEmail] = useState('');

  // Step 1 Form
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
    },
    mode: 'onChange',
  });

  // Step 2 Form
  const step2Form = useForm<RegistrationStep2Data>({
    resolver: zodResolver(registrationStep2Schema),
    defaultValues: {
      email: '',
      otp: '',
    },
    mode: 'onChange',
  });

  const { errors: step1Errors } = step1Form.formState;
  const { errors: step2Errors } = step2Form.formState;

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    step1Form.setValue('mobileNumber', value);
  };

  const handleStep1Submit = async (data: RegistrationStep1Data) => {
    setIsLoading(true);
    try {
      // Format birthDate to ISO string
      const formattedData = {
        ...data,
        birthDate: new Date(data.birthDate).toISOString(),
      };

      const response = await registerStep1(formattedData);

      if (response.message) {
        setRegistrationEmail(data.email);
        step2Form.setValue('email', data.email);

        // Auto-fill OTP if provided in response
        if (response.data?.otp) {
          step2Form.setValue('otp', response.data.otp);
        }

        setCurrentStep(2);
        toast.success(response.message);
        console.log(response);
      } else {
        toast.error(response.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep2Submit = async (data: RegistrationStep2Data) => {
    setIsLoading(true);
    try {
      const response = await verifyRegistrationOTP(data);

      if (response.message) {
        toast.success(response.message);
        // Redirect to login page or dashboard
        window.location.href = '/login';
      } else {
        toast.error(response.message || 'OTP verification failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('OTP verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const goBackToStep1 = () => {
    setCurrentStep(1);
  };

  return (
    <div className='w-full max-w-3xl mx-auto'>
      {/* Progress Indicator */}
      <div className='mb-8'>
        <div className='flex items-center justify-center space-x-4'>
          <div
            className={`flex items-center space-x-2 ${
              currentStep >= 1 ? 'text-yellow-600' : 'text-gray-400'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {currentStep > 1 ? <CheckCircle className='w-5 h-5' /> : '1'}
            </div>
            <span className='text-sm font-medium'>Registration</span>
          </div>
          <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-yellow-500' : 'bg-gray-200'}`}></div>
          <div
            className={`flex items-center space-x-2 ${
              currentStep >= 2 ? 'text-yellow-600' : 'text-gray-400'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {currentStep > 2 ? <CheckCircle className='w-5 h-5' /> : '2'}
            </div>
            <span className='text-sm font-medium'>Verification</span>
          </div>
        </div>
      </div>

      {/* Step 1: Registration Form */}
      {currentStep === 1 && (
        <Form {...step1Form}>
          <form onSubmit={step1Form.handleSubmit(handleStep1Submit)} className='space-y-4'>
            {/* Full Name */}
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

            {/* Mobile Number and Email */}
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

            {/* Birth Date and Gender */}
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

            {/* Password Fields */}
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

            {/* Terms and Conditions */}
            <div className='flex items-start space-x-3'>
              <Checkbox
                id='terms'
                className='mt-1 border-gray-300 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500'
              />
              <label htmlFor='terms' className='text-sm text-gray-700'>
                I agree to the{' '}
                <Link href='#' className='text-yellow-600 hover:text-yellow-500 underline'>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href='#' className='text-yellow-600 hover:text-yellow-500 underline'>
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type='submit'
              disabled={isLoading}
              className='w-full h-12 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg text-lg transition-colors disabled:opacity-50'
            >
              {isLoading ? 'Submitting...' : 'Continue Registration'}
            </Button>
          </form>
        </Form>
      )}

      {/* Step 2: OTP Verification */}
      {currentStep === 2 && (
        <Form {...step2Form}>
          <form onSubmit={step2Form.handleSubmit(handleStep2Submit)} className='space-y-6'>
            <div className='text-center mb-6'>
              <h2 className='text-2xl font-bold text-gray-900 mb-2'>Verify Your Email</h2>
              <p className='text-gray-600'>
                We&apos;ve sent a 4-digit verification code to{' '}
                <span className='font-semibold text-yellow-600'>{registrationEmail}</span>
              </p>
            </div>

            <FormField
              control={step2Form.control}
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
                        error={!!step2Errors.email}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={step2Form.control}
              name='otp'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-medium text-gray-700'>
                    Verification Code *
                  </FormLabel>
                  <FormControl>
                    <OTPInput
                      length={4}
                      value={field.value}
                      onChange={field.onChange}
                      onComplete={field.onChange}
                      disabled={isLoading}
                      error={!!step2Errors.otp}
                      className='justify-center'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex space-x-4'>
              <Button
                type='button'
                variant='outline'
                onClick={goBackToStep1}
                className='flex-1 h-12 border-gray-300 text-gray-700 hover:bg-gray-50'
              >
                <ArrowLeft className='w-4 h-4 mr-2' />
                Back
              </Button>
              <Button
                type='submit'
                disabled={isLoading}
                className='flex-1 h-12 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors disabled:opacity-50'
              >
                {isLoading ? 'Verifying...' : 'Verify & Complete'}
              </Button>
            </div>
          </form>
        </Form>
      )}

      <div className='mt-6 text-center'>
        <p className='text-sm text-gray-600'>
          Already have an account?{' '}
          <Link
            href='/login'
            className='font-medium text-yellow-600 hover:text-yellow-500 underline underline-offset-4'
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
