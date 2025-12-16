const AppointmentSkeleton = () => {
  return (
    <section className="relative w-full pb-10 lg:pb-0">
      {/* Top Wave Placeholder */}
      <div className="h-16 w-full bg-[#0F5B81] opacity-50" />
      
      {/* Main Banner */}
      <div className="bg-[#0F5B81] py-10 -my-1">
        <div className="w-10/12 mx-auto flex flex-col lg:flex-row items-center justify-between animate-pulse">
          
          {/* Left Side Skeleton */}
          <div className="flex flex-col lg:flex-row items-center gap-5 w-full lg:w-auto">
            {/* Icon Circle */}
            <div className="w-20 h-20 bg-white/20 rounded-full hidden lg:block" />
            
            {/* Text Lines */}
            <div className="flex flex-col items-center lg:items-start gap-3 w-full">
              <div className="h-8 w-64 bg-white/20 rounded" />
              <div className="h-6 w-48 bg-white/10 rounded" />
            </div>
          </div>

          {/* Right Side (Buttons) Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 lg:mt-0 w-full lg:w-auto justify-center">
            <div className="h-12 w-48 bg-white/20 rounded-full" />
            <div className="h-12 w-48 bg-white/10 rounded-full" />
          </div>
          
        </div>
      </div>

      {/* Bottom Wave Placeholder */}
      <div className="h-16 w-full bg-[#0F5B81] opacity-50" />
    </section>
  );
};

export default AppointmentSkeleton;