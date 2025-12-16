const ContactSkeleton = () => {
  return (
    <section className="py-20 w-[90%] mx-auto">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        
        {/* --- Left Content Skeleton --- */}
        <div className="space-y-6 animate-pulse">
          {/* Headings */}
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
          <div className="h-12 w-3/4 bg-gray-200 rounded"></div>
          
          {/* Paragraph */}
          <div className="space-y-2">
             <div className="h-4 w-full bg-gray-200 rounded"></div>
             <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          </div>

          {/* Contact Details */}
          <div className="mt-10 space-y-4">
             <div className="flex gap-3 items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-48 bg-gray-200 rounded"></div>
             </div>
             <div className="flex gap-3 items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-40 bg-gray-200 rounded"></div>
             </div>
             <div className="flex gap-3 items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-56 bg-gray-200 rounded"></div>
             </div>
          </div>
        </div>

        {/* --- Right Form Skeleton --- */}
        <div className="w-full lg:w-[90%] mx-auto lg:ml-auto">
           {/* Card Container */}
           <div className="relative">
              {/* The Blue Border Offset Simulation */}
              <div className="absolute inset-0 translate-x-4 translate-y-4 border-4 border-gray-100 rounded-2xl -z-10"></div>
              
              <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg animate-pulse space-y-5">
                 {/* Row 1: Name/Phone */}
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <div className="h-4 w-12 bg-gray-200 rounded"></div>
                       <div className="h-10 w-full bg-gray-100 rounded-full"></div>
                    </div>
                    <div className="space-y-2">
                       <div className="h-4 w-12 bg-gray-200 rounded"></div>
                       <div className="h-10 w-full bg-gray-100 rounded-full"></div>
                    </div>
                 </div>

                 {/* Row 2: Email */}
                 <div className="space-y-2">
                    <div className="h-4 w-12 bg-gray-200 rounded"></div>
                    <div className="h-10 w-full bg-gray-100 rounded-full"></div>
                 </div>

                 {/* Row 3: Subject */}
                 <div className="space-y-2">
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    <div className="h-10 w-full bg-gray-100 rounded-full"></div>
                 </div>

                 {/* Row 4: Message */}
                 <div className="space-y-2">
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    <div className="h-32 w-full bg-gray-100 rounded-2xl"></div>
                 </div>

                 {/* Button */}
                 <div className="h-12 w-full bg-gray-200 rounded-full mt-4"></div>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSkeleton;