export interface CourseDetails {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stats: {
    sections: number;
    videos: number;
    duration: string;
  };
  currentLesson: {
    title: string;
    duration?: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    highlight: string;
  };
  modules: {
    id: string;
    title: string;
    lessons: {
      id: string;
      title: string;
      duration?: string;
      status: 'completed' | 'current' | 'locked';
      type?: 'video' | 'reading';
      hasNotification?: boolean;
    }[];
  }[];
}

export const courseDetailsData: CourseDetails = {
  id: '1',
  title: 'Strength Evolution',
  subtitle: 'new workouts to challenge your limits',
  description:
    'Take a closer look at the key details behind this Housa album. This comprehensive program is designed to help you build strength and endurance through structured workouts.',
  stats: {
    sections: 6,
    videos: 202,
    duration: '19h 37m',
  },
  currentLesson: {
    title: 'Understanding Your Body Type',
    duration: '07:31',
  },
  about: {
    title: 'About Complete Fitness Mastery',
    subtitle: 'new workouts to challenge your limits',
    description:
      'Discover what this 4-week program is all about duration, level, and release highlights in one quick view',
    highlight:
      'Take a closer look at the key details behind this Housa album. This comprehensive program is designed to help you build strength and endurance through structured workouts. The 4-week duration makes it perfect for intermediate athletes looking to push their limits. With powerful structured workouts, this training program focuses on building both physical strength and mental resilience. The program is designed for intermediate level participants and offers a challenging yet achievable progression. Released recently, this program brings fresh approaches to fitness training.',
  },
  modules: [
    {
      id: '1',
      title: 'Module 1: Fitness Fundamentals',
      lessons: [
        { id: '1', title: 'Understanding Your Body Type', status: 'completed' },
        { id: '2', title: 'Understanding Your Body Type', status: 'completed' },
        { id: '3', title: 'Understanding Your Body Type', status: 'completed' },
        {
          id: '4',
          title: 'Understanding Your Body Type',
          status: 'completed',
          hasNotification: true,
        },
        { id: '5', title: 'Understanding Your Body Type', status: 'completed', type: 'reading' },
        { id: '6', title: 'Understanding Your Body Type', status: 'completed', type: 'reading' },
        { id: '7', title: 'Understanding Your Body Type', status: 'current', duration: '07:31' },
        { id: '8', title: 'Understanding Your Body Type', status: 'locked' },
        { id: '9', title: 'Understanding Your Body Type', status: 'locked' },
        { id: '10', title: 'Understanding Your Body Type', status: 'locked' },
        { id: '11', title: 'Understanding Your Body Type', status: 'locked' },
        { id: '12', title: 'Understanding Your Body Type', status: 'locked' },
      ],
    },
  ],
};
