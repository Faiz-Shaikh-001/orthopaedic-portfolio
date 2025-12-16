import { HeroBGURL } from "../../assets/exportAssets";

const HeroSkeleton = ({icons}) => {
  return (
    <section className="relative w-full pt-20 pb-28">
      {/* Container matching the main grid layout */}
      <img
        src={HeroBGURL}
        className="w-full absolute inset-0 -z-20 h-[140%]"
        alt="Hero Background"
        fetchPriority="high"
        loading="eager"
      />
      <div
        className="absolute inset-0 -z-15 mix-blend-multiply"
      >
        {icons.map((Icon, idx) => {
          return (
            <Icon.component
              key={idx}
              aria-hidden="true"
              className={`absolute ${Icon.size} ${Icon.style} ${Icon.anim}`}
            />
          );
        })}
      </div>
      <div className="grid justify-center max-w-10/12 xl:max-w-4xl text-center gap-y-10 mx-auto">
        {/* Title Placeholder */}
        <div className="h-14 bg-gray-900/20 rounded-lg w-3/4 mx-auto animate-pulse"></div>

        {/* Subtext Placeholder (2 lines) */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-900/20 rounded w-5/6 mx-auto animate-pulse"></div>
          <div className="h-4 bg-gray-900/20 rounded w-2/3 mx-auto animate-pulse"></div>
        </div>

        {/* Buttons Placeholder */}
        <div className="flex flex-col md:flex-row justify-center gap-6 mt-4 mx-auto">
          <div className="h-12 w-48 bg-gray-900/20 rounded-lg animate-pulse"></div>
          <div className="h-12 w-48 bg-gray-900/20 rounded-lg animate-pulse"></div>
        </div>

        {/* Stats Placeholder */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center mt-8">
          {/* Stat 1 */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-10 w-16 bg-gray-900/20 rounded animate-pulse"></div>
            <div className="h-3 w-24 bg-gray-900/20 rounded animate-pulse"></div>
          </div>
          {/* Stat 2 */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-10 w-20 bg-gray-900/20 rounded animate-pulse"></div>
            <div className="h-3 w-24 bg-gray-900/20 rounded animate-pulse"></div>
          </div>
          {/* Stat 3 */}
          <div className="flex flex-col items-center gap-2 col-span-2 lg:col-span-1">
            <div className="h-10 w-16 bg-gray-900/20 rounded animate-pulse"></div>
            <div className="h-3 w-20 bg-gray-900/20 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
