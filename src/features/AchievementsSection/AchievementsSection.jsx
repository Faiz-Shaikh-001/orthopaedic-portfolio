import { Icon } from "@iconify/react";
import {
  AchievementIcon,
  MedalIcon,
  MedicalCareHandsIcon,
} from "../../assets/exportAssets";
import { memo, useRef } from "react";
import useBackgroundIconAnimation from "../../customHooks/BackgroundIconAnimation";
import useTypewriterEffectAnimation from "../../customHooks/TypewriterEffectAnimation";
import useFadeInAnimation from "../../customHooks/FadeInAnimation";
import AnimatedWaveTopTop from "../../components/AnimatedWaveTopTop";
import AnimatedWaveTopBottom from "../../components/AnimatedWaveTopBottom";
import AnimatedWaveBottom from "../../components/AnimatedWaveBottom";
import Card from "../../components/Card";
import AchievementsSkeleton from "./AchievementsSkeleton";


const AchievementsSection = ({ content }) => {
  if (!content) return <AchievementsSkeleton />;

  const { heading, sub_text, cards = [] } = content;

  const iconContainerRef = useRef();
  const textRef = useRef();
  const cursorRef = useRef();
  const containerRef = useRef();

  useFadeInAnimation(containerRef, {
    top: "80%",
    direction: "y",
    direction_val: 80,
  });
  useBackgroundIconAnimation(iconContainerRef);
  useTypewriterEffectAnimation(sub_text, cursorRef, textRef);

  return (
    <section className="relative" id="Achievement">
      {/* Background Icons And Waves */}
      <div className="absolute inset-0 pointer-events-none" ref={iconContainerRef}>
        <AchievementIcon className="absolute h-30 w-fit rotate-20 left-[10%] leftIconAnim" aria-hidden="true"/>
        <MedalIcon className="absolute h-40 w-fit -rotate-20 right-[10%] top-[10%] rightIconAnim" aria-hidden="true"/>
        <MedicalCareHandsIcon className="absolute h-90 w-fit rotate-20 right-[1%] top-[70%] rightIconAnim" aria-hidden="true"/>
        <div className="relative -z-10 h-full">
          <div className="absolute w-full top-[20%] md:top-[10%] 2xl:top-0">
            <AnimatedWaveTopTop />
          </div>
          <div className="absolute w-full top-[25%] 2xl:top-[22%]">
            <AnimatedWaveTopBottom />
          </div>
          <div className="absolute w-full top-[82%] 2xl:top-[70%]">
            <AnimatedWaveBottom />
          </div>
        </div>
      </div>
      <div className="py-20 w-10/12 mx-auto">
        <h1 className="font-[inter] font-semibold text-4xl text-center underline decoration-4 leading-10">
          {heading}
        </h1>
        <p className="font-[inter] font-semibold lg:text-2xl lg:w-8/12 text-justify lg:text-center mx-auto my-4 min-h-70">
          <span className="typewriter-text" ref={textRef}></span>
          <span
            className="typewriter-cursor inline-block text-2xl"
            ref={cursorRef}
          >
            |
          </span>
        </p>
        <div className="w-11/12 mx-auto">
          <div
            className="grid lg:grid-cols-3 gap-5 lg:gap-7 gap-x-0 py-7"
            ref={containerRef}
          >
            {cards.map((card, idx) => {
              const isMiddleColumn = idx % 3 === 1;
              const staggerClass = isMiddleColumn ? "lg:mt-10 lg:-mb-10" : "";

              return (
                <Card
                  key={idx}
                  data={card}
                  variant={card.variant}
                  className={staggerClass}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(AchievementsSection);
