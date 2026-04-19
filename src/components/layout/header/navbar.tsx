'use client';
import { Button } from '@/components/ui/button';
import { navbarData } from '@/lib/data/navbar';
import { useProfile } from '@/hooks/profile';
import { removeToken } from '@/lib/utils/cookie';
import { useQueryClient } from '@tanstack/react-query';
import { Bell, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';

interface NavbarProps {
  /** When false, internal app nav links are hidden (subscription required). */
  showAppNavigation: boolean;
}

export default function Navbar({ showAppNavigation }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: profileResponse } = useProfile('en');

  const navigationItems = useMemo(() => {
    const canAccessHawssaReleases = profileResponse?.data?.hasValidHawssaCertificate !== false;
    if (canAccessHawssaReleases) return navbarData;
    return navbarData.filter(item => item.href !== '/hawssa-releases');
  }, [profileResponse?.data?.hasValidHawssaCertificate]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    queryClient.clear();
    removeToken();
    navigate('/login');
  };

  return (
    <div className='py-4 bg-gray-100 relative'>
      <div className='flex justify-between items-center max-w-[1240px] mx-auto px-4 w-full'>
        {/* Logo */}
        <div className='flex items-center gap-2'>
          <img src='/assets/logo.png' alt='Hawssa' width={100} height={100} />
        </div>

        {/* Desktop Navigation */}
        {showAppNavigation ? (
          <div className='hidden lg:flex items-center gap-12 text-md font-semibold text-[#323232CC]'>
            {navigationItems.map(item => (
              <Link
                to={item.href}
                key={item.id}
                className='group relative hover:font-bold hover:scale-105 transition-all duration-300'
              >
                {item.name}
                <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F7F225] to-[#E8CE23] transition-all duration-300 group-hover:w-full'></span>
              </Link>
            ))}
          </div>
        ) : (
          <div className='hidden lg:block flex-1' aria-hidden />
        )}

        {/* Desktop Actions */}
        <div className='hidden lg:flex items-center gap-2'>
          {showAppNavigation && (
            <Button variant='ghost' size='sm'>
              <Bell />
            </Button>
          )}
          <Button variant='default' size='lg' onClick={handleLogout} className='cursor-pointer'>
            Logout
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className='lg:hidden flex items-center gap-2'>
          {showAppNavigation ? (
            <>
              <Button variant='ghost' size='sm'>
                <Bell />
              </Button>
              <Button variant='ghost' size='sm' onClick={toggleMobileMenu} className='ml-2'>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </>
          ) : (
            <Button variant='default' size='lg' onClick={handleLogout} className='cursor-pointer'>
              Logout
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showAppNavigation && isMobileMenuOpen && (
        <div className='lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50'>
          <div className='px-4 py-6 space-y-4'>
            {navigationItems.map(item => (
              <Link
                to={item.href}
                key={item.id}
                className='block py-3 px-4 text-lg font-semibold text-[#323232CC] hover:bg-gray-50 rounded-lg transition-colors duration-200'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button variant='default' size='lg' onClick={handleLogout} className='cursor-pointer'>
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
