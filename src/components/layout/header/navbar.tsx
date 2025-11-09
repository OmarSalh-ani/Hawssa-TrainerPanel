'use client';
import { Button } from '@/components/ui/button';
import { navbarData } from '@/lib/data/navbar';
import { removeToken } from '@/lib/utils/cookie';
import { Bell, Menu, User, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    removeToken();
    router.push('/login');
  };

  return (
    <div className='py-4 bg-gray-100 relative'>
      <div className='flex justify-between items-center max-w-[1240px] mx-auto px-4 w-full'>
        {/* Logo */}
        <div className='flex items-center gap-2'>
          <Image src='/assets/logo.png' alt='Hawssa' width={100} height={100} />
        </div>

        {/* Desktop Navigation */}
        <div className='hidden lg:flex items-center gap-12 text-md font-semibold text-[#323232CC]'>
          {navbarData.map(item => (
            <Link
              href={item.href}
              key={item.id}
              className='group relative hover:font-bold hover:scale-105 transition-all duration-300'
            >
              {item.name}
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F7F225] to-[#E8CE23] transition-all duration-300 group-hover:w-full'></span>
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className='hidden lg:flex items-center gap-2'>
          <Button variant='ghost' size='sm'>
            <Bell />
          </Button>
          <Button variant='default' size='lg' onClick={handleLogout} className='cursor-pointer'>
            Logout
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className='lg:hidden flex items-center gap-2'>
          <Button variant='ghost' size='sm'>
            <Bell />
          </Button>
          <Button variant='ghost' size='sm'>
            <User />
          </Button>
          <Button variant='ghost' size='sm' onClick={toggleMobileMenu} className='ml-2'>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className='lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50'>
          <div className='px-4 py-6 space-y-4'>
            {navbarData.map(item => (
              <Link
                href={item.href}
                key={item.id}
                className='block py-3 px-4 text-lg font-semibold text-[#323232CC] hover:bg-gray-50 rounded-lg transition-colors duration-200'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
