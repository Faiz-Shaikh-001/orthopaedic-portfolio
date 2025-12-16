const NavbarSkeleton = () => {
  return (
    <nav className="relative z-50 bg-white shadow-sm w-full">
      {/* Mobile Skeleton */}
      <div className="flex justify-between items-center px-4 py-4 xl:hidden">
        <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-6 w-8 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Desktop Skeleton */}
      <div className="w-11/12 mx-auto hidden xl:block pb-2">
        <div className="flex justify-between items-center py-4">
          {/* Logo Placeholder */}
          <div className="flex items-center gap-2">
             <div className="h-16 w-16 bg-gray-200 rounded-xl animate-pulse"></div>
             <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="flex items-center gap-8">
            {/* Contact Info Placeholder 1 */}
            <div className="flex gap-3 items-center">
              <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="space-y-1">
                 <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                 <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            {/* Contact Info Placeholder 2 */}
            <div className="flex gap-3 items-center">
              <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="space-y-1">
                 <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                 <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            {/* Button Placeholder */}
            <div className="h-12 w-40 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>

        <hr className="border-gray-200 mb-4" />

        {/* Links Placeholder */}
        <div className="flex justify-between">
          {[...Array(9)].map((_, i) => (
             <div key={i} className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavbarSkeleton;