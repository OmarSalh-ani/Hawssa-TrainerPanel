import RegistrationForm from '@/components/features/auth/signup/RegistrationForm';

export function SignupPage() {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center px-8 bg-white">
        <div className="max-w-4xl mx-auto w-full">
          <div className="mb-6">
            <img src="/assets/logo.png" alt="Hawssa" width={100} height={100} />
          </div>

          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1C1C1CCC] leading-tight">
              JOIN <span className="text-yellow-500">HAWSSA</span> AS A TRAINER
            </h2>
            <p className="mt-2 text-sm text-[#323232CC]">
              Create your trainer account and start inspiring others through dance fitness
            </p>
          </div>

          <RegistrationForm />

          <div className="mt-8 text-center">
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
