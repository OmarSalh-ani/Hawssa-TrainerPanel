'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubscriptionPlan } from '@/lib/types/subscription';
import { Camera, Phone } from 'lucide-react';
import { useState } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: SubscriptionPlan | null;
}

type PaymentMethod = 'instapay' | 'paypal' | 'vodafone';

const paymentMethods = [
  {
    id: 'instapay' as PaymentMethod,
    name: 'Instapay',
    logo: '💜',
    color: 'bg-purple-500',
    textColor: 'text-white',
  },
  {
    id: 'paypal' as PaymentMethod,
    name: 'PayPal',
    logo: 'P',
    color: 'bg-blue-500',
    textColor: 'text-white',
  },
  {
    id: 'vodafone' as PaymentMethod,
    name: 'Vodafone Cash',
    logo: 'O',
    color: 'bg-red-500',
    textColor: 'text-white',
  },
];

export function PaymentModal({ isOpen, onClose, plan }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('instapay');
  const [paymentDetails, setPaymentDetails] = useState({
    instapay: '',
    paypal: '',
    vodafone: '',
  });
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!plan) return null;

  const handlePayment = () => {
    if (!isConfirmed) return;
    // Handle payment logic here
    console.log('Processing payment for:', plan.title, 'via', selectedMethod);
    onClose();
  };

  const getInputPlaceholder = (method: PaymentMethod) => {
    switch (method) {
      case 'instapay':
        return 'Instapay Number';
      case 'paypal':
        return '@ paypal email';
      case 'vodafone':
        return 'Vodafone Cash Number';
      default:
        return '';
    }
  };

  const getInputLabel = (method: PaymentMethod) => {
    switch (method) {
      case 'instapay':
        return 'instapay Number';
      case 'paypal':
        return 'paypal email';
      case 'vodafone':
        return 'vodafon cash Number';
      default:
        return '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md bg-gray-900 text-white border-gray-700'>
        <DialogHeader className='flex flex-row items-center justify-between'>
          <div className='flex items-center gap-4'>
            <DialogTitle className='text-lg font-semibold'>Subscribe {plan.title}</DialogTitle>
            <span className='text-xl font-bold text-yellow-400'>{plan.price}</span>
          </div>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Payment Method Selection */}
          <div>
            <h3 className='text-sm font-medium text-gray-300 mb-3'>Choose Payment Method</h3>
            <div className='grid grid-cols-3 gap-2'>
              {paymentMethods.map(method => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    selectedMethod === method.id
                      ? 'bg-yellow-400 border-yellow-400 text-gray-900'
                      : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <div className='flex flex-col items-center gap-2'>
                    <div
                      className={`w-8 h-8 rounded-full ${method.color} ${method.textColor} flex items-center justify-center text-sm font-bold`}
                    >
                      {method.logo}
                    </div>
                    <span className='text-xs font-medium'>{method.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Details Input */}
          <div>
            <Label htmlFor='payment-details' className='text-sm text-gray-300'>
              {getInputLabel(selectedMethod)}
            </Label>
            <div className='relative mt-2'>
              <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
              <Input
                id='payment-details'
                type='text'
                placeholder={getInputPlaceholder(selectedMethod)}
                value={paymentDetails[selectedMethod]}
                onChange={e =>
                  setPaymentDetails(prev => ({
                    ...prev,
                    [selectedMethod]: e.target.value,
                  }))
                }
                className='pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400'
              />
            </div>
          </div>

          {/* Transaction Upload Area */}
          <div>
            <div className='border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors cursor-pointer'>
              <Camera className='w-8 h-8 text-gray-400 mx-auto mb-2' />
              <p className='text-sm text-gray-400'>Transaction Reset</p>
            </div>
          </div>

          {/* Confirmation Checkbox */}
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='confirm-payment'
              checked={isConfirmed}
              onCheckedChange={checked => setIsConfirmed(checked as boolean)}
              className='border-gray-600 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400'
            />
            <Label htmlFor='confirm-payment' className='text-sm text-gray-300 cursor-pointer'>
              Confirm i have pay
            </Label>
          </div>

          {/* Payment Button */}
          <Button
            onClick={handlePayment}
            disabled={!isConfirmed || !paymentDetails[selectedMethod]}
            className='w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
