import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

interface FooterProps {
  /** When false, social / external link blocks are hidden (subscription gate). */
  showSocialLinks?: boolean;
}

const Footer = ({ showSocialLinks = true }: FooterProps) => {
  return (
    <footer className='bg-[#0a0a0a] text-gray-300 py-8 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Top Section */}
        <div className='flex flex-col md:flex-row justify-between items-center mb-6'>
          {/* Logo Section */}
          <div className='mb-4 md:mb-0'>
            <img src='/assets/logofooter.png' alt='Hawssa' width={200} height={200} />
          </div>

          {/* Social Media Section */}
          {showSocialLinks && (
            <div className='flex flex-col items-center md:items-end'>
              <p className='text-sm mb-3'>Find Us On</p>
              <div className='flex space-x-3'>
                {/* Facebook */}
                <a
                  href='#'
                  className='w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors'
                  aria-label='Facebook'
                >
                  <Facebook className='w-5 h-5 text-white' />
                </a>

                {/* Twitter */}
                <a
                  href='#'
                  className='w-10 h-10 bg-[#fcfc00] rounded-lg flex items-center justify-center hover:bg-yellow-400 transition-colors'
                  aria-label='Twitter'
                >
                  <Twitter className='w-5 h-5 text-gray-900' />
                </a>

                {/* LinkedIn */}
                <a
                  href='#'
                  className='w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors'
                  aria-label='LinkedIn'
                >
                  <Linkedin className='w-5 h-5 text-white' />
                </a>

                {/* Instagram */}
                <a
                  href='#'
                  className='w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors'
                  aria-label='Instagram'
                >
                  <Instagram className='w-5 h-5 text-white' />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Separator Line */}
        <div className='border-t border-gray-600 mb-6'></div>

        {/* Bottom Section */}
        <div className='flex flex-col md:flex-row justify-between items-center text-sm'>
          {/* Copyright */}
          <div className='mb-2 md:mb-0'>
            <p>
              Copyright <span className='font-semibold text-[#F7F225]'>© HAWSSA ® </span>Dance
              Fitness 2025
            </p>
          </div>

          {/* Developer Credit */}
          <div>
            <p>Designed & Developed By Catalyst</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
