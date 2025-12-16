const FAQSkeleton = () => {
  return (
    <section className="relative py-20 w-full overflow-hidden bg-gray-50">
      
      {/* Heading Skeleton */}
      <div className="flex flex-col items-center mb-10 gap-3">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-64 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Grid Skeleton */}
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-5 lg:gap-8 items-start">
          
          {/* Create 6 placeholder FAQ cards */}
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 drop-shadow-sm border border-gray-100 animate-pulse flex items-start gap-4"
            >
              {/* Icon Circle */}
              <div className="w-8 h-8 bg-gray-200 rounded-full shrink-0 mt-1"></div>
              
              <div className="w-full space-y-3">
                {/* Question Line */}
                <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                
                {/* Simulated Answer Lines (faded) */}
                <div className="space-y-2 pt-2 opacity-50">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default FAQSkeleton;