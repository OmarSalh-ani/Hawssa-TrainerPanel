'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils/utils';
import { forwardRef, useEffect, useRef, useState } from 'react';

export interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  error?: boolean;
}

const OTPInput = forwardRef<HTMLInputElement, OTPInputProps>(
  ({ length = 4, value = '', onChange, onComplete, disabled, className, error }, ref) => {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
      if (value) {
        const valueArray = value.split('').slice(0, length);
        const newOtp = [...otp];
        valueArray.forEach((char, index) => {
          newOtp[index] = char;
        });
        setOtp(newOtp);
      }
    }, [value, length, otp]);

    const handleChange = (element: HTMLInputElement, index: number) => {
      const val = element.value;
      if (val.length > 1) {
        // Handle paste
        const pastedData = val.slice(0, length);
        const pastedArray = pastedData.split('');
        const newOtp = [...otp];
        pastedArray.forEach((char, i) => {
          if (i < length) {
            newOtp[i] = char;
          }
        });
        setOtp(newOtp);

        // Focus the last filled input or the next empty one
        const lastFilledIndex = Math.min(pastedArray.length - 1, length - 1);
        const nextEmptyIndex = pastedArray.findIndex((char, i) => i >= lastFilledIndex && !char);
        const focusIndex =
          nextEmptyIndex !== -1 ? nextEmptyIndex : Math.min(lastFilledIndex + 1, length - 1);

        if (inputRefs.current[focusIndex]) {
          inputRefs.current[focusIndex]?.focus();
        }

        const otpValue = newOtp.join('');
        onChange?.(otpValue);

        if (otpValue.length === length) {
          onComplete?.(otpValue);
        }
        return;
      }

      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);
      setActiveIndex(index);

      const otpValue = newOtp.join('');
      onChange?.(otpValue);

      if (otpValue.length === length) {
        onComplete?.(otpValue);
      }

      // Move to next input
      if (val && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === 'Backspace') {
        if (!otp[index] && index > 0) {
          // Move to previous input if current is empty
          inputRefs.current[index - 1]?.focus();
        } else {
          // Clear current input
          const newOtp = [...otp];
          newOtp[index] = '';
          setOtp(newOtp);
          onChange?.(newOtp.join(''));
        }
      } else if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === 'ArrowRight' && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleFocus = (index: number) => {
      setActiveIndex(index);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
      const pastedArray = pastedData.split('');
      const newOtp = [...otp];

      pastedArray.forEach((char, i) => {
        if (i < length) {
          newOtp[i] = char;
        }
      });

      setOtp(newOtp);

      // Focus the last filled input or the next empty one
      const lastFilledIndex = Math.min(pastedArray.length - 1, length - 1);
      const nextEmptyIndex = pastedArray.findIndex((char, i) => i >= lastFilledIndex && !char);
      const focusIndex =
        nextEmptyIndex !== -1 ? nextEmptyIndex : Math.min(lastFilledIndex + 1, length - 1);

      if (inputRefs.current[focusIndex]) {
        inputRefs.current[focusIndex]?.focus();
      }

      const otpValue = newOtp.join('');
      onChange?.(otpValue);

      if (otpValue.length === length) {
        onComplete?.(otpValue);
      }
    };

    return (
      <div className={cn('flex gap-2 justify-center', className)}>
        {otp.map((digit, index) => (
          <Input
            key={index}
            ref={el => {
              inputRefs.current[index] = el;
              if (index === 0 && ref) {
                if (typeof ref === 'function') {
                  ref(el);
                } else {
                  ref.current = el;
                }
              }
            }}
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            maxLength={1}
            value={digit}
            onChange={e => handleChange(e.target, index)}
            onKeyDown={e => handleKeyDown(e, index)}
            onFocus={() => handleFocus(index)}
            onPaste={handlePaste}
            disabled={disabled}
            className={cn(
              'w-12 h-12 text-center text-2xl font-semibold border-2 rounded-lg',
              'focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500',
              'transition-all duration-200',
              error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300',
              activeIndex === index && !error ? 'border-yellow-500 ring-2 ring-yellow-500' : '',
              disabled && 'opacity-50 cursor-not-allowed',
            )}
            autoComplete='one-time-code'
          />
        ))}
      </div>
    );
  },
);

OTPInput.displayName = 'OTPInput';

export default OTPInput;
