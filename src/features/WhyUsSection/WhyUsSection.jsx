import { memo, useRef } from "react";
import {
  Checkmark,
  HandshakeIcon,
  HeartIcon,
  SmileIcon,
  SupportIcon,
} from "../../assets/exportAssets";
import FilledButton from "../../components/filledButton";
import useFadeInAnimation from "../../customHooks/FadeInAnimation";
import WhyUsSkeleton from "./WhyUsSkeleton";

const ICON_COMPONENTS = {
  handshake: HandshakeIcon,
  heart: HeartIcon,
  smile: SmileIcon,
  support: SupportIcon,
  default: HeartIcon,
};

const WhyUsSection = ({ content }) => {
  if (!content) return <WhyUsSkeleton />;
  const {
    heading,
    sub_heading,
    intro_text,
    bullets = [],
    benefits_list = [],
  } = content;

  const leftContainerRef = useRef();
  const rightContainerRef = useRef();

  useFadeInAnimation(leftContainerRef, {
    top: "70%",
    direction: "x",
    direction_val: -100,
  });
  useFadeInAnimation(rightContainerRef, {
    top: "70%",
    direction: "x",
    direction_val: 100,
  });

  return (
    <section className="w-full py-40 lg:py-10" id="WhyUs">
      <div className="w-11/12 lg:w-10/12 mx-auto grid gap-1 items-center xl:flex">
        
        <div className={`mt-15 lg:mt-0 block lg:hidden`} ref={leftContainerRef}>
          <h2 className="text-5xl font-semibold text-[#0F5B81] mb-7 fadeInAnim">
            {heading}
          </h2>
          <h3 className="text-4xl font-semibold text-[#2A778D] mb-7 fadeInAnim">
            {sub_heading}
          </h3>
        </div>

        <div className="w-11/12 mx-auto lg:w-8/12 xl:w-6/12 font-[inter] order-2 xl:order-1 mt-10" ref={leftContainerRef}>
          <div className={`hidden lg:block`}>
            <h2 className="text-5xl font-semibold text-[#0F5B81] mb-7 fadeInAnim">
              {heading}
            </h2>
            <h3 className="text-4xl font-semibold text-[#2A778D] mb-7 fadeInAnim">
              {sub_heading}
            </h3>
          </div>
          <p className="text-3xl font-regular mb-5 fadeInAnim">{intro_text}</p>
          <ul className="text-3xl font-regular mb-7">
            {bullets.map((point, idx) => (
              <li
                className="w-fit flex gap-1 items-center fadeInAnim"
                key={idx}
              >
                <Checkmark className="w-6 h-6 shrink-0 "></Checkmark>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="xl:w-[60%] fadeInAnim">
            <FilledButton text={"Book Appointment"} scrollToId={"#Contact"} />
          </div>
        </div>

        <div
          className="md:w-10/12 lg:w-8/12 xl:w-6/12 grid md:grid-cols-2 wrap-normal gap-8 items-center justify-center lg:justify-start order-1 xl:order-2 mx-auto"
          ref={rightContainerRef}
        >
          {benefits_list.map((benefit, idx) => {
            const IconComponent =
              ICON_COMPONENTS[benefit.icon_key] || ICON_COMPONENTS.default;
            const staggerClass = idx % 2 !== 0 ? "md:-mt-8 md:mb-8" : "";
            return (
              <div
                key={idx}
                className={`bg-white w-full max-w-70 p-4 border-[#48CEF3] border-3 ${staggerClass} shadow-sm hover:shadow-lg transition-shadow duration-300 fadeInAnim`}
              >
                <IconComponent className="w-14 h-14"></IconComponent>
                <h5 className="font-[montserrat] font-bold text-xl text-[#09A1CB] my-2">
                  {benefit.title}
                </h5>
                <p className="font-[montserrat] font-bold text-sm text-[#0F5B81] opacity-60">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default memo(WhyUsSection);
