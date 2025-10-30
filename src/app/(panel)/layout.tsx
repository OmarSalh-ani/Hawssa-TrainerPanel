import Footer from '@/components/layout/footer/footer';
import Navbar from '@/components/layout/header/navbar';

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      {/* <Banner /> */}
      <main className='flex-1 mt-10'>{children}</main>
      <Footer />
    </div>
  );
}
