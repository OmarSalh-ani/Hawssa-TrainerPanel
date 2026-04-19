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

      {/* Latest releases: each album card shows title, optional song name, and video count */}
      <LatestReleasesSection />
    </div>
  );
}
