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
import { login } from '@/lib/apis/auth/auth';
import { loginSchema, type LoginFormData } from '@/lib/schemes/auth';
import { setToken } from '@/lib/utils/cookie';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onChange',
  });
  const { errors } = form.formState;

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const response = await login(data);
      console.log(response);

      if (response.success && response.data?.token) {
        setToken(response.data.token);
        console.log(response.data.token);
        toast.success(response.message);
        router.push('/');
      } else {
        toast.error(response.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full max-w-md mx-auto'>
      {/* Login Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm font-medium text-gray-700'>Email address</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Mail
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                        errors.email ? 'text-red-500' : 'text-yellow-500'
                      }`}
                    />
                    <Input
                      placeholder='Enter your email'
                      type='email'
                      className='pl-10 h-12 '
                      error={!!errors.email}
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
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm font-medium text-gray-700'>Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Lock
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                        errors.password ? 'text-red-500' : 'text-yellow-500'
                      }`}
                    />
                    <Input
                      placeholder='Enter your password'
                      type={showPassword ? 'text' : 'password'}
                      className='pl-10 pr-10 h-12 '
                      error={!!errors.password}
                      {...field}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-500 hover:text-yellow-600'
                    >
                      {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex items-center justify-between'>
            <Link
              href='/forgot-password'
              className='text-sm font-medium text-yellow-600 hover:text-yellow-500'
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type='submit'
            className='w-full h-12 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg text-lg transition-colors'
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className='h-4 w-4 animate-spin' /> : 'Sign In'}
          </Button>
        </form>
      </Form>

      <div className='mt-6 text-center'>
        <p className='text-sm text-gray-600'>
          Don&apos;t have an account?{' '}
          <Link
            href='/signup'
            className='font-medium text-yellow-600 hover:text-yellow-500 underline underline-offset-4'
          >
            Create New Account
          </Link>
        </p>
      </div>
    </div>
  );
}
