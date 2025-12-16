import { memo, useRef } from "react";
import {
  HeroBGURL,
  KneeCrescentIcon,
  KneeHexIcon,
  KneePlusIcon,
} from "../../assets/exportAssets.js";
import FilledButton from "../../components/filledButton.jsx";
import OutlinedButton from "../../components/outlinedButton.jsx";
import useBackgroundIconAnimation from "../../customHooks/BackgroundIconAnimation.jsx";
import useTypewriterEffectAnimation from "../../customHooks/TypewriterEffectAnimation.jsx";
import useNumberIncrementAnimation from "../../customHooks/NumberIncrementAnimation.jsx";
import HeroSkeleton from "./HeroSkeleton.jsx";

const ICON_CONFIG = [
  {
    component: KneeHexIcon,
    size: "h-15 xl:h-25 w-fit",
    style: "opacity-85 rotate-25 top-[2.5%] left-[2.5%]",
    anim: "leftIconAnim",
  },
  {
    component: KneeCrescentIcon,
    size: "h-14 xl:h-24 w-fit",
    style: "opacity-55 top-[50%] left-[1%]",
    anim: "leftIconAnim",
  },
  {
    component: KneeHexIcon,
    size: "h-15 xl:h-25 w-fit",
    style: "opacity-85 rotate-25 top-[90%] left-[7%]",
    anim: "leftIconAnim",
  },
  {
    component: KneePlusIcon,
    size: "h-15 xl:h-30 w-fit",
    style: "opacity-55 -rotate-25 top-[40%] left-[12%]",
    anim: "leftIconAnim",
  },
  {
    component: KneeHexIcon,
    size: "h-15 xl:h-25 w-fit",
    style: "opacity-85 rotate-25 -top-[15%] left-[25%]",
    anim: "leftIconAnim",
  },
  {
    component: KneePlusIcon,
    size: "h-15 xl:h-30 w-fit",
    style: "opacity-85 -rotate-25 top-[2%] right-[25%]",
    anim: "rightIconAnim",
  },
  {
    component: KneePlusIcon,
    size: "h-15 xl:h-35 w-fit",
    style: "opacity-85 -rotate-25 -top-[20%] -right-[4%]",
    anim: "rightIconAnim",
  },
  {
    component: KneeHexIcon,
    size: "h-15 xl:h-25 w-fit",
    style: "opacity-85 rotate-25 top-[25%] right-[10%]",
    anim: "rightIconAnim",
  },
  {
    component: KneeHexIcon,
    size: "h-15 xl:h-25 w-fit",
    style: "opacity-85 rotate-25 bottom-[15%] right-0",
    anim: "rightIconAnim",
  },
  {
    component: KneeCrescentIcon,
    size: "h-15 xl:h-28 w-fit",
    style: "opacity-55 bottom-[1%] right-[30%]",
    anim: "rightIconAnim",
  },
];

const HeroSection = ({ content }) => {
  if (!content) return <HeroSkeleton icons={ICON_CONFIG} />;

  const { title, subtext, stats } = content;

  const iconContainerRef = useRef();
  const textRef = useRef();
  const cursorRef = useRef();
  const statsContainerRef = useRef();

  useBackgroundIconAnimation(iconContainerRef);
  useTypewriterEffectAnimation(subtext, cursorRef, textRef);
  useNumberIncrementAnimation(statsContainerRef);

  return (
    <section id="Home" className="relative w-full pt-20 pb-28">
      <img
        src={HeroBGURL}
        className="w-full absolute inset-0 -z-20 h-[140%]"
        alt="Hero Background"
        fetchPriority="high"
        loading="eager"
      />
      <div
        className="absolute inset-0 -z-15 mix-blend-multiply"
        ref={iconContainerRef}
      >
        {ICON_CONFIG.map((Icon, idx) => {
          return (
            <Icon.component
              key={idx}
              aria-hidden="true"
              className={`absolute ${Icon.size} ${Icon.style} ${Icon.anim}`}
            />
          );
        })}
      </div>

      {/* Foreground Content */}
      <div className="grid justify-center max-w-10/12  xl:max-w-4xl text-center gap-y-7 mx-auto text-white">
        <h1 className="text-center font-[battambang] text-5xl font-black">
          {title}
        </h1>
        <h3 className="font-[battambang] font-bold text-xl leading-7 xl:leading-10 min-h-20">
          <span className="typewriter-text" ref={textRef}></span>
          <span
            className="typewriter-cursor inline-block text-2xl font-thin"
            ref={cursorRef}
          >
            |
          </span>
        </h3>

        {/* button row */}
        <div
          className="grid xl:grid-flow-col xl:grid-cols-12 justify-center gap-6 z-5
          "
        >
          <FilledButton
            colSpan="xl:col-start-2 xl:col-span-6"
            text={"Book Appointment"}
            scrollToId={"#Contact"}
          />
          <OutlinedButton
            text={"View Services"}
            colSpan={"xl:col-span-4"}
            scrollToId={"#Services"}
          />
        </div>

        {/* stats */}
        <div
          className="grid grid-cols-2 lg:grid-cols-3 mx-auto  justify-center gap-12 font-bold font-[battambang] text-4xl flex-col xl:flex-row"
          ref={statsContainerRef}
        >
          <StatItem value={stats.exp} label="Years Experience" suffix="+" />
          <StatItem value={stats.patients} label="Happy Patients" />
          <StatItem
            value={stats.surgeries}
            label="Surgeries"
            className="col-span-2 lg:col-span-1"
          />
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ value, label, suffix = "", className = "" }) => (
  <h2 className={`grid ${className}`}>
    <span>
      <span className="data" data-target={value}>
        {0}
      </span>
      {suffix}
    </span>
    <span className="text-sm">{label}</span>
  </h2>
);

export default memo(HeroSection);
