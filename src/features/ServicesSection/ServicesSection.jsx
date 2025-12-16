import { memo, useRef } from "react";
import {
  BoneDCIcon,
  BoneFractureIcon,
  HipBoneIcon,
  KneeCircleIcon,
  MedicalCareHandsIcon,
  OurServicesBGURL,
  ReportIcon,
  RunningIcon,
} from "../../assets/exportAssets";
import useFadeInAnimation from "../../customHooks/FadeInAnimation";
import ServicesSkeleton from "./ServiceSkeleton";

const ICON_COMPONENTS = {
  knee: KneeCircleIcon,
  fracture: BoneFractureIcon,
  running: RunningIcon,
  scope: BoneDCIcon,
  hip: HipBoneIcon,
  report: ReportIcon,
  default: MedicalCareHandsIcon,
};

const ServicesSection = ({ content }) => {
  if (!content) return <ServicesSkeleton />;

  const { heading, services_list = [] } = content || {};

  const containerRef = useRef();
  const iconRef = useRef();

  useFadeInAnimation(containerRef, {
    top: "60%",
    direction: "y",
    direction_val: 80,
  });
  useFadeInAnimation(iconRef, {
    top: "60%",
    direction: "x",
    direction_val: -50,
  });

  return (
    <section className="relative w-full lg:-mt-40 scroll-smooth" id="Services">
      <img
        src={OurServicesBGURL}
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-20 -mt-20 w-screen h-[130%] lg:h-[120%]"
      />

      <div className="absolute inset-0" ref={iconRef}>
        {/* Background glow */}
        <div className="absolute pointer-events-none -right-[25%] top-[50%]  lg:top-1/4 size-[50%] rounded-full bg-radial radial-[at_50%_75%] from-[#88CEC2] to-[#0F5B81] to-90% blur-3xl opacity-40"></div>
        <div className="absolute pointer-events-none -left-[25%] top-[50%]  lg:top-1/4 size-[50%] rounded-full bg-radial radial-[at_50%_75%] from-[#88CEC2] to-[#0F5B81] to-90% blur-3xl opacity-40"></div>

        {/* Background icon */}
        <MedicalCareHandsIcon className="absolute pointer-events-none h-50 w-50 top-[15%] left-[5%] -rotate-30 mix-blend-soft-light fadeInAnim" />
      </div>

      <div className="lg:p-50 relative z-10" ref={containerRef}>
        <h2 className="font-[montserrat] font-bold text-[2.5rem] underline decoration-4 text-shadow-lg/20 text-center mb-10 text-white fadeInAnim">
          {heading}
        </h2>
        <div className="flex flex-col items-center lg:grid lg:grid-cols-3 gap-4">
          {services_list.map((service, idx) => {
            const IconComponent =
              ICON_COMPONENTS[service.icon_key] || ICON_COMPONENTS.default;
            return (
              <ServiceCard
                key={idx}
                title={service.title}
                desc={service.description}
                Icon={IconComponent}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = memo(({ title, desc, Icon }) => {
  return (
    <div
      className="relative group overflow-clip
              bg-white 
              p-6 w-[90%] lg:w-full rounded-2xl h-fit lg:h-full 
              fadeInAnim 
              before:transition-all before:ease-in-out before:duration-500 before:absolute before:w-full before:h-0 before:bottom-0 before:left-0 before:-z-1 hover:before:h-full 
              before:bg-[#072c3f]
              hover:shadow-lg/50 hover:shadow-white isolate"
    >
      <Icon className="w-16 h-16 mb-3 text-[#09A1CB]"></Icon>
      <Icon
        aria-hidden="true"
        className="absolute w-32 h-32 mb-3 text-[#09A1CB] -bottom-40 right-0 opacity-0 group-hover:bottom-0 z-100 transition-all ease-in-out duration-300 group-hover:opacity-15 mix-blend-luminosity"
      ></Icon>

      <h5 className="text-2xl font-[inria] font-bold text-[#09A1CB] mb-1">
        {title}
      </h5>
      <p className="text-lg font-[inria] leading-5 group-hover:text-white duration-200">
        {desc}
      </p>
    </div>
  );
});

export default memo(ServicesSection);
