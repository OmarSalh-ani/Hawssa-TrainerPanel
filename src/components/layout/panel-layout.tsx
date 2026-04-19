'use client';

import Footer from '@/components/layout/footer/footer';
import Navbar from '@/components/layout/header/navbar';
import { SubscriptionExpiryBanner } from '@/components/layout/subscription-expiry-banner';
import { useSubscriptionStatus } from '@/hooks/subscription';
import { hasActiveSubscription } from '@/lib/utils/subscription-access';
import { Outlet } from 'react-router-dom';

export function PanelLayout() {
  const { data: subscriptionApi, isPending } = useSubscriptionStatus();
  const showAppNavigation = !isPending && hasActiveSubscription(subscriptionApi);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showAppNavigation={showAppNavigation} />
      <SubscriptionExpiryBanner />
      <main className="flex-1 mt-10">
        <Outlet />
      </main>
      <Footer showSocialLinks={showAppNavigation} />
    </div>
  );
}
