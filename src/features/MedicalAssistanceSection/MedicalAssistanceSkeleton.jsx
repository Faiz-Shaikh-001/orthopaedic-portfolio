const MedicalAssistanceSkeleton = () => {
  return (
    <section className="relative flex flex-col gap-0 -mt-20 z-10">
      {/* Top BG Placeholder */}
      <div className="w-full h-20 bg-[#0E5B81]" />

      <div className="bg-[#0E5B81] py-10">
        {/* Title Placeholder */}
        <div className="w-64 h-10 bg-white/20 mx-auto rounded mb-14 animate-pulse" />

        <div className="grid lg:grid-cols-3 gap-7 w-10/12 mx-auto">
          {[...Array(6)].map((_, idx) => {
            // Replicate the staggered layout
            const isMiddleColumn = idx % 3 === 1;
            const staggerClass = isMiddleColumn ? "lg:mt-7 lg:-mb-7" : "";
            
            return (
              <div
                key={idx}
                className={`w-full p-8 rounded-lg bg-white/10 animate-pulse ${staggerClass}`}
              >
                <div className="w-12 h-12 bg-white/20 rounded mb-4" />
                <div className="w-3/4 h-8 bg-white/20 rounded mb-4" />
                <div className="space-y-3 mb-6">
                  <div className="w-full h-4 bg-white/10 rounded" />
                  <div className="w-full h-4 bg-white/10 rounded" />
                  <div className="w-2/3 h-4 bg-white/10 rounded" />
                </div>
                <div className="w-24 h-4 bg-white/30 rounded" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom BG Placeholder */}
      <div className="w-full h-20 bg-[#0E5B81]" />
    </section>
  );
};

export default MedicalAssistanceSkeleton;