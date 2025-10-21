'use client';

import Section from '@/components/layout/header/section';
import { HomeData } from '@/lib/types/home';
import Card from './card';

interface CardsListProps {
  homeData?: HomeData;
}

export default function CardsList({ homeData }: CardsListProps) {
  // Create cards from API data
  const cards = [
    {
      id: 1,
      title: 'Total Courses',
      description: 'Courses in progress',
      icon: 'BookOpen',
      color: '#3B82F6',
      number: homeData?.coursesProgress.coursesCount || 0,
      text: 'courses',
    },
    {
      id: 2,
      title: 'Progress',
      description: 'Overall completion',
      icon: 'TrendingUp',
      color: '#10B981',
      number: homeData?.coursesProgress.overallProgressPercent || 0,
      text: '%',
    },
    {
      id: 3,
      title: 'Profile Views',
      description: 'This month',
      icon: 'Eye',
      color: '#F59E0B',
      number: homeData?.profileViews || 0,
      text: 'views',
    },
    {
      id: 4,
      title: 'Last Course',
      description: 'Current progress',
      icon: 'Play',
      color: '#8B5CF6',
      number: homeData?.lastCourseProgress?.completePercent || 0,
      text: '%',
    },
  ];

  return (
    <Section>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {cards.map(card => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            icon={card.icon as any}
            color={card.color}
            number={card.number}
            text={card.text}
          />
        ))}
      </div>
    </Section>
  );
}
