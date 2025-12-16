const AboutSkeleton = () => {
  return (
    <section className="relative -mt-30 lg:-mt-40 bg-white z-0">
      {/* Top Background Placeholder (Subtle gray block to reserve space) */}
      <div className="w-full h-32 lg:h-60 bg-gray-50 animate-pulse" />

      <div className="relative py-10">
        <div className="flex flex-wrap gap-10 items-center justify-center pt-10 lg:pt-0 max-w-6xl mx-auto">
          
          {/* --- LEFT COLUMN: Image & Name --- */}
          <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-end animate-pulse px-6 lg:px-0">
            {/* Image Placeholder - Matches your specific rounded shape */}
            <div className="relative w-[70%] lg:w-full aspect-[3/4] bg-gray-200 rounded-t-full rounded-bl-full shadow-sm"></div>
            
            {/* Name Placeholder */}
            <div className="h-8 bg-gray-200 w-3/4 mt-8 rounded"></div>
            
            {/* Designation Placeholder */}
            <div className="h-4 bg-gray-200 w-1/2 mt-3 rounded"></div>
          </div>

          {/* --- RIGHT COLUMN: Bio Text --- */}
          <div className="w-full lg:w-1/2 p-4 lg:p-0 animate-pulse">
            
            {/* Heading Placeholder */}
            <div className="pb-7 w-max">
              <div className="h-10 lg:h-14 bg-gray-200 w-64 lg:w-96 rounded-lg relative">
                 {/* Simulate the border box effect */}
                 <div className="absolute -bottom-2 right-0 w-[60%] h-1 bg-gray-300 rounded"></div>
              </div>
            </div>

            {/* Paragraph Lines */}
            <div className="space-y-4 pt-6">
              <div className="h-4 bg-gray-200 w-full rounded"></div>
              <div className="h-4 bg-gray-200 w-full rounded"></div>
              <div className="h-4 bg-gray-200 w-11/12 rounded"></div>
              <div className="h-4 bg-gray-200 w-full rounded"></div>
              <div className="h-4 bg-gray-200 w-5/6 rounded"></div>
              
              {/* Gap for second paragraph */}
              <div className="h-4 bg-gray-200 w-full rounded mt-8"></div>
              <div className="h-4 bg-gray-200 w-4/5 rounded"></div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Bottom Background Placeholder */}
      <div className="w-full h-20 lg:h-50 bg-gray-50 animate-pulse" />
    </section>
  );
};

export default AboutSkeleton;