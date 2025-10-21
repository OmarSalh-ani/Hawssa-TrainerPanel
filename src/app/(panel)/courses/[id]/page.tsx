import { CourseDetailsContent } from '@/components/features/panel/courses';

interface CourseDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CourseDetailsPage({ params }: CourseDetailsPageProps) {
  const { id } = await params;
  return <CourseDetailsContent courseId={id} />;
}
