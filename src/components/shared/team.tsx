export default function team() {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
      <div className='text-center space-y-4 mb-12'>
        <h2 className='text-3xl font-bold text-[#344054]'>Meet Our Expert Trainers</h2>
        <p className='font-medium text-base text-[#667085]'>
          Our certified fitness professionals bring years of experience and passion
        </p>
      </div>
      <div>
        <img
          src='/assets/Header.svg'
          alt='Team'
          width={500}
          height={500}
          className='rounded-lg w-full h-[400px] object-cover object-center'
        />
      </div>
    </div>
  );
}
