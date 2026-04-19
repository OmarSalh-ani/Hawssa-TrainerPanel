import ReleaseDetailsContent from '@/components/features/panel/hawssa-releases/release-details-content';
import { useParams } from 'react-router-dom';

export function ReleaseDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const releaseId = slug ? parseInt(slug, 10) : NaN;
  if (Number.isNaN(releaseId)) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <ReleaseDetailsContent releaseId={releaseId} />
    </div>
  );
}
