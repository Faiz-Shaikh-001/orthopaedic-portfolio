const ServicesSkeleton = () => {
  return (
    <section className="relative w-full lg:-mt-40 py-20 bg-[#0a2540] z-10">
      {/* Title Placeholder */}
      <div className="flex justify-center mb-10">
        <div className="h-10 w-64 bg-slate-700/50 rounded-lg animate-pulse" />
      </div>

      {/* Grid Container */}
      <div className="flex flex-col items-center lg:grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
        {/* Render 6 Skeleton Cards */}
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="relative bg-white p-6 w-[90%] lg:w-full rounded-2xl h-64 animate-pulse shadow-lg"
          >
            {/* Icon Placeholder */}
            <div className="w-16 h-16 bg-gray-200 rounded-full mb-4" />

            {/* Title Placeholder */}
            <div className="h-6 bg-gray-200 w-3/4 rounded mb-4" />

            {/* Description Lines */}
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 w-full rounded" />
              <div className="h-4 bg-gray-200 w-5/6 rounded" />
              <div className="h-4 bg-gray-200 w-4/6 rounded" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSkeleton;
