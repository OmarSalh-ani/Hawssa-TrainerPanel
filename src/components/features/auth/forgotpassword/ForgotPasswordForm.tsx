'use client';

import { Button } from '@/components/ui/button';
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
import {
  completePasswordReset,
  requestPasswordReset,
  verifyPasswordResetOTP,
} from '@/lib/apis/auth/auth';
import {
  forgotPasswordStep1Schema,
  forgotPasswordStep2Schema,
  forgotPasswordStep3Schema,
  type ForgotPasswordStep1Data,
  type ForgotPasswordStep2Data,
  type ForgotPasswordStep3Data,
} from '@/lib/schemes/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, CheckCircle, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function ForgotPasswordForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Step 1 Form
  const step1Form = useForm<ForgotPasswordStep1Data>({
    resolver: zodResolver(forgotPasswordStep1Schema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  // Step 2 Form
  const step2Form = useForm<ForgotPasswordStep2Data>({
    resolver: zodResolver(forgotPasswordStep2Schema),
    defaultValues: {
      email: '',
      otp: '',
    },
    mode: 'onChange',
  });

  // Step 3 Form
  const step3Form = useForm<ForgotPasswordStep3Data>({
    resolver: zodResolver(forgotPasswordStep3Schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const { errors: step1Errors } = step1Form.formState;
  const { errors: step2Errors } = step2Form.formState;
  const { errors: step3Errors } = step3Form.formState;

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleStep1Submit = async (data: ForgotPasswordStep1Data) => {
    setIsLoading(true);
    try {
      const response = await requestPasswordReset(data);

      if (response.message) {
          setResetEmail(data.email);
          step2Form.setValue('email', data.email);
          step3Form.setValue('email', data.email);

          // Auto-fill OTP if provided in response
          if (response.data?.otp) {
            step2Form.setValue('otp', response.data.otp);
          }

          setCurrentStep(2);
          setCountdown(60); // 60 seconds countdown
          toast.success(response.message);
        } else {
        toast.error(response.message || 'Failed to send reset code. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Password reset request error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep2Submit = async (data: ForgotPasswordStep2Data) => {
    setIsLoading(true);
    try {
      const response = await verifyPasswordResetOTP(data);

      if (response.message) {
        setCurrentStep(3);
        toast.success(response.message);
      } else {
        toast.error(response.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('OTP verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep3Submit = async (data: ForgotPasswordStep3Data) => {
    setIsLoading(true);
    try {
      const response = await completePasswordReset(data);

      if (response.message) {
        toast.success(response.message);
        // Redirect to login page
        window.location.href = '/login';
      } else {
        toast.error(response.message || 'Failed to reset password. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Password reset completion error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const goBackToStep1 = () => {
    setCurrentStep(1);
    setCountdown(0);
  };

  const goBackToStep2 = () => {
    setCurrentStep(2);
  };

  const resendCode = async () => {
    if (countdown > 0) return;

    setIsLoading(true);
    try {
      const response = await requestPasswordReset({ email: resetEmail });

      if (response.message) {
        // Auto-fill OTP if provided in response
        if (response.data?.otp) {
          step2Form.setValue('otp', response.data.otp);
        }
        setCountdown(60);
        toast.success(response.message);
      } else {
        toast.error('Failed to resend code. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Resend code error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        {/* Header */}
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            <span className='font-serif'>Hawssa</span>
          </h1>
          <p className='text-sm font-medium text-gray-600 tracking-wider mb-8'>DANCE FITNESS</p>

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
                <span className='text-sm font-medium'>Email</span>
              </div>
              <div
                className={`w-16 h-1 ${currentStep >= 2 ? 'bg-yellow-500' : 'bg-gray-200'}`}
              ></div>
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
                <span className='text-sm font-medium'>Verify</span>
              </div>
              <div
                className={`w-16 h-1 ${currentStep >= 3 ? 'bg-yellow-500' : 'bg-gray-200'}`}
              ></div>
              <div
                className={`flex items-center space-x-2 ${
                  currentStep >= 3 ? 'text-yellow-600' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= 3 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > 3 ? <CheckCircle className='w-5 h-5' /> : '3'}
                </div>
                <span className='text-sm font-medium'>Reset</span>
              </div>
            </div>
          </div>

          {/* Step Titles */}
          {currentStep === 1 && (
            <>
              <h2 className='text-2xl font-bold text-gray-900'>
                FORGOT YOUR <span className='text-yellow-500'>PASSWORD?</span>
              </h2>
              <p className='mt-2 text-sm text-gray-600'>
                Don&apos;t Worry! Enter Your Registered Email Address, And We&apos;ll Send You A OTP
                Code To Reset Your Password.
              </p>
            </>
          )}

          {currentStep === 2 && (
            <>
              <h2 className='text-2xl font-bold text-gray-900'>
                ENTER <span className='text-yellow-500'>VERIFICATION CODE</span>
              </h2>
              <p className='mt-2 text-sm text-gray-600'>
                We&apos;ve Sent A Verification Code To{' '}
                <span className='font-semibold text-yellow-600'>{resetEmail}</span>. Please Enter
                The Code Below To Proceed.
              </p>
            </>
          )}

          {currentStep === 3 && (
            <>
              <h2 className='text-2xl font-bold text-gray-900'>
                CREATE A NEW <span className='text-yellow-500'>PASSWORD</span>
              </h2>
              <p className='mt-2 text-sm text-gray-600'>
                Enter A New Password For Your Account And Make Sure To Keep It Safe. Choose A Strong
                Password With Uppercase, Lowercase, Numbers, And Symbols.
              </p>
            </>
          )}
        </div>

        {/* Step 1: Email Input */}
        {currentStep === 1 && (
          <Form {...step1Form}>
            <form onSubmit={step1Form.handleSubmit(handleStep1Submit)} className='space-y-6'>
              <FormField
                control={step1Form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='block text-sm font-medium text-gray-700'>Email</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-500' />
                        <Input
                          placeholder='Email'
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

              <Button
                type='submit'
                disabled={isLoading}
                className='w-full h-12 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors disabled:opacity-50'
              >
                {isLoading ? 'Sending...' : 'Send Verification Code'}
              </Button>
            </form>
          </Form>
        )}

        {/* Step 2: OTP Verification */}
        {currentStep === 2 && (
          <Form {...step2Form}>
            <form onSubmit={step2Form.handleSubmit(handleStep2Submit)} className='space-y-6'>
              <FormField
                control={step2Form.control}
                name='otp'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='block text-sm font-medium text-gray-700'>
                      Verification Code
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
                  {isLoading ? 'Verifying...' : 'Verify'}
                </Button>
              </div>

              <div className='text-center'>
                <button
                  type='button'
                  onClick={resendCode}
                  disabled={countdown > 0}
                  className={`text-sm ${
                    countdown > 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-yellow-600 hover:text-yellow-500'
                  }`}
                >
                  {countdown > 0 ? `Send Code Again ${countdown}s` : 'Send Code Again'}
                </button>
              </div>
            </form>
          </Form>
        )}

        {/* Step 3: New Password */}
        {currentStep === 3 && (
          <Form {...step3Form}>
            <form onSubmit={step3Form.handleSubmit(handleStep3Submit)} className='space-y-6'>
              <FormField
                control={step3Form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='block text-sm font-medium text-gray-700'>
                      New Password
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-500' />
                        <Input
                          placeholder='Enter new password'
                          type={showPassword ? 'text' : 'password'}
                          className='pl-10 pr-10 h-12 border-gray-300 focus:ring-yellow-500 focus:border-yellow-500'
                          error={!!step3Errors.password}
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
                control={step3Form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='block text-sm font-medium text-gray-700'>
                      Confirm New Password
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-500' />
                        <Input
                          placeholder='Confirm New Password'
                          type={showConfirmPassword ? 'text' : 'password'}
                          className='pl-10 pr-10 h-12 border-gray-300 focus:ring-yellow-500 focus:border-yellow-500'
                          error={!!step3Errors.confirmPassword}
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

              <div className='flex space-x-4'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={goBackToStep2}
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
                  {isLoading ? 'Changing...' : 'Change Password'}
                </Button>
              </div>
            </form>
          </Form>
        )}

        {/* Footer Links */}
        <div className='text-center space-y-2'>
          <p className='text-sm text-gray-600'>
            Remember your password?{' '}
            <Link href='/login' className='font-medium text-yellow-600 hover:text-yellow-500'>
              Sign in
            </Link>
          </p>
          <p className='text-xs text-gray-500'>powered by Catalyst</p>
        </div>
      </div>
    </div>
  );
}
