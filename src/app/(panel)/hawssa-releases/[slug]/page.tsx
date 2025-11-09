import ReleaseDetailsContent from '@/components/features/panel/hawssa-releases/release-details-content';

interface ReleaseDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ReleaseDetailsPage({ params }: ReleaseDetailsPageProps) {
  const { slug } = await params;
  const releaseId = parseInt(slug, 10);

  return (
    <div className='min-h-screen bg-gray-100'>
      <ReleaseDetailsContent releaseId={releaseId} />
    </div>
  );
}
