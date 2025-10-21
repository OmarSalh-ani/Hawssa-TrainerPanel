'use client';

import { CardSkeleton } from '@/components/ui/skeleton';
import { useSubscriptionTypes } from '@/hooks/subscription';
import { Subscription } from '@/lib/types/subscription';
import { Calendar, Crown, Star, Zap } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { SubscriptionForm } from './subscription-form';

export function SubscriptionPlans() {
  const { data: subscriptionData, isLoading, error } = useSubscriptionTypes();
  const [selectedPlan, setSelectedPlan] = useState<Subscription | null>(null);
  const [showForm, setShowForm] = useState(false);

  const getPlanIcon = (index: number) => {
    const icons = [Crown, Star, Zap, Calendar];
    return icons[index % icons.length];
  };

  const getPlanColor = (index: number) => {
    const colors = ['#8B5CF6', '#F59E0B', '#10B981', '#EF4444', '#3B82F6', '#EC4899', '#06B6D4'];
    return colors[index % colors.length];
  };

  const handleSelectPlan = (plan: Subscription) => {
    setSelectedPlan(plan);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedPlan(null);
  };

  if (isLoading) {
    return (
      <div className='space-y-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>Choose Your Plan</h2>
          <p className='text-gray-600'>Select the subscription plan that works best for you</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center py-12'>
        <div className='text-red-500 text-6xl mb-4'>⚠️</div>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>Error Loading Plans</h2>
        <p className='text-gray-600'>Please try again later.</p>
      </div>
    );
  }

  const subscriptions = subscriptionData?.data?.subscriptions || [];

  return (
    <div className='space-y-8'>

      {/* Header */}
      <div className='text-center'>
        <h2 className='text-3xl font-bold text-gray-900 mb-4'>Choose Your Plan</h2>
        <p className='text-gray-600'>Select the subscription plan that works best for you</p>
      </div>

      {/* Plans Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {subscriptions.map((plan, index) => {
          const Icon = getPlanIcon(index);
          const color = getPlanColor(index);
          const isPopular = index === 1; // Mark second plan as popular

          return (
            <div
              key={plan.id}
              className={`relative bg-white rounded-xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                isPopular ? 'border-purple-500 ring-2 ring-purple-200' : 'border-gray-200'
              }`}
            >
              {isPopular && (
                <div className='absolute -top-3 left-1/2 transform -translate-x-1/2'>
                  <span className='bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium'>
                    Most Popular
                  </span>
                </div>
              )}

              <div className='p-6'>
                {/* Icon and Title */}
                <div className='text-center mb-6'>
                  <div
                    className='w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'
                    style={{ backgroundColor: color + '20' }}
                  >
                    <Icon className='w-8 h-8' style={{ color }} />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-2'>{plan.title}</h3>
                  <p className='text-gray-600 text-sm'>{plan.description}</p>
                </div>

                {/* Image */}
                {plan.image && (
                  <div className='mb-6'>
                    <Image
                      src={plan.image}
                      alt={plan.title}
                      width={300}
                      height={200}
                      className='w-full h-32 object-cover rounded-lg'
                    />
                  </div>
                )}

                {/* Price */}
                <div className='text-center mb-6'>
                  <div className='text-4xl font-bold text-gray-900 mb-1'>
                    ${plan.price.toFixed(2)}
                  </div>
                  <div className='text-gray-600'>{plan.duration}</div>
                </div>

                {/* Features */}
                <div className='space-y-2 mb-6'>
                  <div className='flex items-center text-sm text-gray-600'>
                    <Calendar className='w-4 h-4 mr-2' style={{ color }} />
                    <span>{plan.daysCount} days access</span>
                  </div>
                  <div className='flex items-center text-sm text-gray-600'>
                    <Crown className='w-4 h-4 mr-2' style={{ color }} />
                    <span>All courses included</span>
                  </div>
                  <div className='flex items-center text-sm text-gray-600'>
                    <Zap className='w-4 h-4 mr-2' style={{ color }} />
                    <span>Premium features</span>
                  </div>
                </div>

                {/* Select Button */}
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className='w-full py-3 px-4 rounded-lg font-medium text-white transition-colors hover:opacity-90'
                  style={{ backgroundColor: color }}
                >
                  Select Plan
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subscription Form Modal */}
      {showForm && selectedPlan && (
        <SubscriptionForm selectedPlan={selectedPlan} onClose={handleCloseForm} />
      )}
    </div>
  );
}
