const FooterSkeleton = () => {
  return (
    <footer className="bg-[#0A1933] pt-15 pb-6">
      <div className="w-10/12 grid lg:grid-cols-4 mx-auto gap-10 animate-pulse">
        
        {/* Col 1: Brand */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-15 w-15 bg-white/10 rounded-xl"></div>
            <div className="space-y-2">
              <div className="h-4 w-32 bg-white/10 rounded"></div>
              <div className="h-3 w-40 bg-white/10 rounded"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-white/10 rounded"></div>
            <div className="h-3 w-5/6 bg-white/10 rounded"></div>
            <div className="h-3 w-4/6 bg-white/10 rounded"></div>
          </div>
          <div className="hidden lg:block space-y-4 pt-4">
             <div className="h-6 w-24 bg-white/10 rounded"></div>
             <div className="flex gap-4">
               <div className="h-12 w-12 bg-white/10 rounded"></div>
               <div className="h-12 w-12 bg-white/10 rounded"></div>
               <div className="h-12 w-12 bg-white/10 rounded"></div>
             </div>
          </div>
        </div>

        {/* Col 2: Contact */}
        <div className="space-y-6">
          <div className="h-6 w-32 bg-white/10 rounded mb-6"></div>
          <div className="space-y-4">
             <div className="h-4 w-3/4 bg-white/10 rounded"></div>
             <div className="h-4 w-1/2 bg-white/10 rounded"></div>
             <div className="h-4 w-2/3 bg-white/10 rounded"></div>
             <div className="h-20 w-3/4 bg-white/5 rounded mt-4"></div>
          </div>
        </div>

        {/* Col 3: Quick Links */}
        <div className="space-y-4">
           <div className="h-6 w-32 bg-white/10 rounded mb-6"></div>
           <div className="h-4 w-1/2 bg-white/10 rounded"></div>
           <div className="h-4 w-2/3 bg-white/10 rounded"></div>
           <div className="h-4 w-1/2 bg-white/10 rounded"></div>
           <div className="h-4 w-3/4 bg-white/10 rounded"></div>
        </div>

        {/* Col 4: CTA */}
        <div className="space-y-6">
           <div className="h-6 w-40 bg-white/10 rounded mb-4"></div>
           <div className="h-24 w-full bg-white/10 rounded-2xl"></div>
           <div className="h-3 w-full bg-white/10 rounded"></div>
           <div className="h-3 w-5/6 bg-white/10 rounded"></div>
        </div>

      </div>
    </footer>
  );
};

export default FooterSkeleton;