import { memo } from "react";

const AchievementsSkeleton = () => {
  return (
    <section className="relative py-20 w-10/12 mx-auto animate-pulse" id="Achievement-Skeleton">
      
      {/* 1. Heading Placeholder */}
      <div className="flex justify-center mb-6">
        <div className="h-10 w-64 bg-gray-200 rounded-lg"></div>
      </div>

      {/* 2. Typewriter Text Placeholder (2 lines to reserve space) */}
      <div className="flex flex-col items-center gap-3 mb-12">
        <div className="h-4 w-full lg:w-8/12 bg-gray-200 rounded"></div>
        <div className="h-4 w-3/4 lg:w-6/12 bg-gray-200 rounded"></div>
      </div>

      {/* 3. Cards Grid */}
      <div className="w-11/12 mx-auto">
        <div className="grid lg:grid-cols-3 gap-5 lg:gap-7 py-7">
          
          {/* Loop to create 3 cards */}
          {[...Array(3)].map((_, idx) => {
            // Replicate the Stagger Logic: Middle column (index 1) gets margin top
            const isMiddleColumn = idx === 1;
            const staggerClass = isMiddleColumn ? "lg:mt-10 lg:-mb-10" : "";

            return (
              <div
                key={idx}
                className={`relative w-full h-80 bg-gray-100 rounded-xl p-6 ${staggerClass} border-2 border-gray-50`}
              >
                {/* Icon Placeholder */}
                <div className="w-14 h-14 bg-gray-200 rounded-full mb-6"></div>

                {/* Title Placeholder */}
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>

                {/* Text Lines */}
                <div className="space-y-3 mb-8">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                  <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
                </div>

                {/* CTA Placeholder */}
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
            );
          })}
          
        </div>
      </div>
    </section>
  );
};

export default memo(AchievementsSkeleton);