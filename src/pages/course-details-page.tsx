import { CourseDetailsContent } from '@/components/features/panel/courses';
import { useParams } from 'react-router-dom';

export function CourseDetailsPage() {
  const { id } = useParams<{ id: string }>();
  if (!id) return null;
  return <CourseDetailsContent courseId={id} />;
}
