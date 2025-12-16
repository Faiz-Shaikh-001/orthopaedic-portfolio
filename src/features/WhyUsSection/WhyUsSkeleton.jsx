const WhyUsSkeleton = () => {
  return (
    <section className="w-full py-40 lg:py-10 bg-white">
      <div className="w-11/12 lg:w-10/12 mx-auto grid items-start xl:flex gap-10">
        
        {/* Left Column Skeleton */}
        <div className="w-full xl:w-6/12 order-2 xl:order-1 space-y-6 animate-pulse mt-10 xl:mt-0">
          {/* Headings */}
          <div className="h-12 bg-gray-200 w-3/4 rounded-lg"></div>
          <div className="h-10 bg-gray-200 w-full rounded-lg"></div>
          
          {/* Intro Text */}
          <div className="h-6 bg-gray-200 w-11/12 rounded mt-8"></div>
          <div className="h-6 bg-gray-200 w-10/12 rounded"></div>

          {/* Bullets */}
          <div className="space-y-4 mt-8">
             <div className="flex gap-3">
               <div className="w-6 h-6 bg-gray-200 rounded-full shrink-0"></div>
               <div className="h-6 bg-gray-200 w-3/4 rounded"></div>
             </div>
             <div className="flex gap-3">
               <div className="w-6 h-6 bg-gray-200 rounded-full shrink-0"></div>
               <div className="h-6 bg-gray-200 w-2/3 rounded"></div>
             </div>
             <div className="flex gap-3">
               <div className="w-6 h-6 bg-gray-200 rounded-full shrink-0"></div>
               <div className="h-6 bg-gray-200 w-4/5 rounded"></div>
             </div>
          </div>
          
          {/* Button */}
          <div className="h-14 w-48 bg-gray-200 rounded-full mt-10"></div>
        </div>

        {/* Right Column Skeleton (Staggered Grid) */}
        <div className="w-full xl:w-6/12 grid md:grid-cols-2 gap-8 order-1 xl:order-2">
          {/* Card 1 (Normal) */}
          <CardSkeleton />
          {/* Card 2 (Staggered Up) */}
          <CardSkeleton className="md:-mt-12 md:mb-12" />
          {/* Card 3 (Normal) */}
          <CardSkeleton />
          {/* Card 4 (Staggered Up) */}
          <CardSkeleton className="md:-mt-12 md:mb-12" />
        </div>

      </div>
    </section>
  );
};

const CardSkeleton = ({ className = "" }) => (
  <div className={`bg-gray-50 border-2 border-gray-100 p-6 rounded-xl h-64 animate-pulse ${className}`}>
    <div className="w-14 h-14 bg-gray-200 rounded-full mb-4"></div>
    <div className="h-6 bg-gray-200 w-3/4 rounded mb-4"></div>
    <div className="h-4 bg-gray-200 w-full rounded mb-2"></div>
    <div className="h-4 bg-gray-200 w-5/6 rounded mb-2"></div>
    <div className="h-4 bg-gray-200 w-4/6 rounded"></div>
  </div>
);

export default WhyUsSkeleton;