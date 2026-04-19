import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

// Registration Step 1 Schema
export const registrationStep1Schema = z
  .object({
    fullName: z.string().min(1, 'Full name is required').min(2, 'Full name must be at least 2 characters'),
    mobileNumber: z.string().min(1, 'Mobile number is required').min(10, 'Mobile number must be at least 10 digits'),
    email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
    birthDate: z
      .string()
      .min(1, 'Birth date is required')
      .refine(
        date => {
          const birthDate = new Date(date);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();

          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1 >= 13;
          }
          return age >= 13;
        },
        {
          message: 'You must be at least 13 years old to register',
        },
      ),
    isMale: z.boolean(),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    acceptTerms: z.boolean().refine(val => val === true, {
      message: 'You must agree to the Terms, Privacy Policy, and Instructor Agreement to continue',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// Forgot Password Step 1 Schema (Request Password Reset)
export const forgotPasswordStep1Schema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
});

// Forgot Password Step 2 Schema (Verify OTP)
export const forgotPasswordStep2Schema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  otp: z.string().min(1, 'OTP is required').length(4, 'OTP must be exactly 4 digits'),
});

// Forgot Password Step 3 Schema (Complete Password Reset)
export const forgotPasswordStep3Schema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// Legacy signup schema (keeping for backward compatibility)
export const signupSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    birthDate: z
      .string()
      .min(1, 'Birth date is required')
      .refine(
        date => {
          const birthDate = new Date(date);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();

          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1 >= 13;
          }
          return age >= 13;
        },
        {
          message: 'You must be at least 13 years old to register',
        },
      ),
    gender: z.enum(['male', 'female'], {
      message: 'Please select a gender',
    }),
    phone: z.string().min(1, 'Phone number is required'),
    nationalPhoneNumber: z.string().optional(),
    countryCode: z.string().optional(),
    selectedCountry: z.string().optional(),
    email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type RegistrationStep1Data = z.infer<typeof registrationStep1Schema>;
export type ForgotPasswordStep1Data = z.infer<typeof forgotPasswordStep1Schema>;
export type ForgotPasswordStep2Data = z.infer<typeof forgotPasswordStep2Schema>;
export type ForgotPasswordStep3Data = z.infer<typeof forgotPasswordStep3Schema>;
