const TestimonialSkeleton = () => {
  return (
    <section className="relative w-full py-20 bg-white">
      {/* Heading Placeholder */}
      <div className="flex justify-center mb-10">
        <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="relative flex items-center justify-center pt-10 pb-10 w-full max-w-7xl mx-auto">
        
        {/* Left Arrow Skeleton */}
        <div className="w-10 h-10 bg-gray-200 rounded animate-pulse hidden lg:block" />

        {/* Slider Area Skeleton */}
        <div className="h-96 w-full max-w-4xl mx-4 flex flex-col items-center justify-center">
          
          {/* Avatar Skeleton */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse z-10" />
            <div className="absolute w-28 h-28 border-2 border-dashed border-gray-200 rounded-full" />
          </div>

          {/* Name Skeleton */}
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8" />

          {/* Quote Text Lines */}
          <div className="w-10/12 md:w-8/12 flex flex-col gap-3 items-center">
             <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
             <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse" />
             <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
          </div>

        </div>

        {/* Right Arrow Skeleton */}
        <div className="w-10 h-10 bg-gray-200 rounded animate-pulse hidden lg:block" />
      </div>
    </section>
  );
};

export default TestimonialSkeleton;