'use client';

import { usePaymentMethods, useSubscribeToPlan } from '@/hooks/subscription';
import { PaymentMethod, Subscription, SubscriptionFormData } from '@/lib/types/subscription';
import { AlertCircle, CreditCard, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface SubscriptionFormProps {
  selectedPlan: Subscription;
  onClose: () => void;
}

export function SubscriptionForm({ selectedPlan, onClose }: SubscriptionFormProps) {
  const { data: paymentMethodsData, isLoading: isLoadingPaymentMethods } = usePaymentMethods();
  const subscribeMutation = useSubscribeToPlan();

  const [formData, setFormData] = useState<SubscriptionFormData>({
    subscriptionId: selectedPlan.id,
    paymentMethodId: 0,
    paymentProofImage: null as unknown as File,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const paymentMethods = paymentMethodsData?.data?.paymentMethods || [];

  const handleInputChange = (field: keyof SubscriptionFormData, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.paymentMethodId) {
      newErrors.paymentMethodId = 'Please select a payment method';
    }

    if (!formData.paymentProofImage) {
      newErrors.paymentProofImage = 'Please upload a payment proof image';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await subscribeMutation.mutateAsync(formData);
      onClose();
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleInputChange('paymentProofImage', file);
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4'>
      <div className='bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h2 className='text-2xl font-bold text-gray-900'>Complete Your Subscription</h2>
          <button onClick={onClose} className='text-gray-400 hover:text-gray-600 transition-colors'>
            <X className='w-6 h-6' />
          </button>
        </div>

        {/* Content */}
        <div className='p-6'>
          {/* Selected Plan Summary */}
          <div className='bg-gray-50 rounded-lg p-4 mb-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>{selectedPlan.title}</h3>
            <div className='flex items-center justify-between'>
              <span className='text-gray-600'>{selectedPlan.description}</span>
              <span className='text-2xl font-bold text-gray-900'>
                ${selectedPlan.price.toFixed(2)}
              </span>
            </div>
            <div className='text-sm text-gray-500 mt-1'>{selectedPlan.duration}</div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Payment Method Selection */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-3'>
                Select Payment Method
              </label>
              {isLoadingPaymentMethods ? (
                <div className='space-y-2'>
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className='h-12 bg-gray-200 rounded-lg animate-pulse' />
                  ))}
                </div>
              ) : (
                <div className='space-y-2'>
                  {paymentMethods.map((method: PaymentMethod) => (
                    <label
                      key={method.id}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        formData.paymentMethodId === method.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type='radio'
                        name='paymentMethod'
                        value={method.id}
                        checked={formData.paymentMethodId === method.id}
                        onChange={e =>
                          handleInputChange('paymentMethodId', parseInt(e.target.value))
                        }
                        className='sr-only'
                      />
                      <div className='flex items-center space-x-3'>
                        <CreditCard className='w-5 h-5 text-gray-600' />
                        <div>
                          <div className='font-medium text-gray-900'>{method.name}</div>
                          <div className='text-sm text-gray-600'>{method.paymentAddress}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
              {errors.paymentMethodId && (
                <p className='mt-1 text-sm text-red-600 flex items-center'>
                  <AlertCircle className='w-4 h-4 mr-1' />
                  {errors.paymentMethodId}
                </p>
              )}
            </div>

            {/* Payment Proof Upload */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-3'>
                Upload Payment Proof
              </label>
              <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors'>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleFileChange}
                  className='hidden'
                  id='payment-proof'
                />
                <label
                  htmlFor='payment-proof'
                  className='cursor-pointer flex flex-col items-center space-y-2'
                >
                  <Upload className='w-8 h-8 text-gray-400' />
                  <span className='text-sm text-gray-600'>
                    {formData.paymentProofImage
                      ? formData.paymentProofImage.name
                      : 'Click to upload payment proof image'}
                  </span>
                  <span className='text-xs text-gray-500'>PNG, JPG, JPEG up to 10MB</span>
                </label>
              </div>
              {errors.paymentProofImage && (
                <p className='mt-1 text-sm text-red-600 flex items-center'>
                  <AlertCircle className='w-4 h-4 mr-1' />
                  {errors.paymentProofImage}
                </p>
              )}
            </div>

            {/* Preview Uploaded Image */}
            {formData.paymentProofImage && (
              <div className='mt-4'>
                <p className='text-sm font-medium text-gray-700 mb-2'>Preview:</p>
                <div className='relative w-32 h-32 border rounded-lg overflow-hidden'>
                  <Image
                    src={URL.createObjectURL(formData.paymentProofImage)}
                    alt='Payment proof preview'
                    fill
                    className='object-cover'
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className='flex space-x-4 pt-4'>
              <button
                type='button'
                onClick={onClose}
                className='flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={subscribeMutation.isPending}
                className='flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
              >
                {subscribeMutation.isPending ? 'Processing...' : 'Complete Subscription'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
