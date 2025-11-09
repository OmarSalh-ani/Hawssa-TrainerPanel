import Team from '@/components/shared/team';
import HeroBanner from './hero-banner';
import LatestReleasesSection from './latest-releases-section';
import StatisticsSection from './statistics-section';

export default function HawssaReleasesContent() {
  return (
    <div className='min-h-screen'>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Statistics Section */}
      <StatisticsSection />

      {/* Featured Section */}
      {/* <FeaturedSection /> */}

      {/* Latest Releases Section */}
      <LatestReleasesSection />
      {/*  */}
      <Team />
    </div>
  );
}
