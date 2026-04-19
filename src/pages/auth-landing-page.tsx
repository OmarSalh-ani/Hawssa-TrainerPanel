import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function AuthLandingPage() {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center px-8 bg-white">
        <div className="max-w-lg mx-auto w-full">
          <div className="mb-8">
            <img src="/assets/logo.png" alt="Hawssa" width={100} height={100} />
          </div>

          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1C1C1CCC] leading-tight">
              WELCOME TO THE WORLD OF <span className="text-yellow-500">HAWSSA</span> DANCE FITNESS
            </h2>
          </div>

          <div className="mb-10">
            <p className="text-[#323232CC] leading-relaxed text-lg">
              Hawssa Is A Unique Platform That Blends Fitness With Dance In A Fun, Energetic, And
              Engaging Way. Join Us To Improve Your Health, Boost Your Daily Energy, And Learn
              Exciting Dance Moves Inspired By Global Rhythms.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link to="/signup" className="flex-1">
              <Button
                size="lg"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg py-3 text-lg transition-colors"
              >
                Create New Account
              </Button>
            </Link>
            <Link to="/login" className="flex-1">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-2 border-black text-black hover:bg-gray-50 font-semibold rounded-lg py-3 text-lg transition-colors"
              >
                Log In
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              powered by <span className="font-semibold text-yellow-500">Catalyst</span>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block flex-1 relative min-h-0">
        <div className="absolute inset-0">
          <img
            src="/assets/authhero.png"
            alt="Hawssa Dance Fitness Performance"
            className="absolute inset-0 h-full w-full object-cover rounded-l-lg"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
      </div>
    </div>
  );
}
