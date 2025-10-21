import { Zap } from 'lucide-react';

export interface SubscriptionData {
  id: number;
  title: string;
  status: 'Active' | 'Not Active';
  statusColor: string;
  expirationDate: string;
  daysRemaining: number;
  message: string;
  buttonText: string;
  buttonColor: string;
}

export interface CertificateData {
  id: number;
  title: string;
  status: 'Active' | 'Not Active';
  statusColor: string;
  expirationDate: string;
  message: string;
  downloadButtonText: string;
  renewButtonText: string;
  renewButtonColor: string;
}

export interface EnergyLevelData {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
  currentLevel: number;
  changePercentage: number;
  changeType: 'increase' | 'decrease';
  weeklyGoal: number;
  aboveTarget: number;
}

export const subscriptionData: SubscriptionData = {
  id: 1,
  title: 'Plan State',
  status: 'Not Active',
  statusColor: '#EF4444',
  expirationDate: '25/08/2025',
  daysRemaining: 23,
  message:
    'Your subscription expires in 23 days. Renew now to continue accessing premium features!',
  buttonText: 'Renew Subscription',
  buttonColor: '#FDE047',
};

export const certificateData: CertificateData = {
  id: 2,
  title: 'Certificate Status',
  status: 'Not Active',
  statusColor: '#EF4444',
  expirationDate: '25/08/2025',
  message:
    'Your trainer certificate has expired. Renew now to continue being a certified trainer on the platform.',
  downloadButtonText: 'Download',
  renewButtonText: 'Renew',
  renewButtonColor: '#FDE047',
};

export const energyLevelData: EnergyLevelData = {
  id: 3,
  title: 'Energy Level',
  description: 'Keep your motivation burning bright!',
  icon: Zap,
  iconColor: '#8B5CF6',
  currentLevel: 94,
  changePercentage: 12,
  changeType: 'increase',
  weeklyGoal: 85,
  aboveTarget: 9,
};
