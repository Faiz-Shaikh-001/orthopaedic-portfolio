import {
  MedicalAssistBottomBG,
  MedicalAssistTopBG,
} from "../../assets/exportAssets";
import { memo, useRef } from "react";
import useFadeInAnimation from "../../customHooks/FadeInAnimation";
import MedicalAssistanceSkeleton from "./MedicalAssistanceSkeleton";
import Card from "../../components/Card";

const MedicalAssistanceSection = ({ content }) => {
  if (!content) return <MedicalAssistanceSkeleton />;

  const { heading = "Our Medical Assistance", cards = [] } = content;

  const containerRef = useRef();

  useFadeInAnimation(containerRef, {
    top: "70%",
    direction: "y",
    direction_val: 80,
  });

  return (
    <section
      className="relative flex flex-col gap-0 -mt-20"
      id="MedicalAssistance"
    >
      <MedicalAssistTopBG className="w-full" />
      <div className="bg-[#0E5B81] -my-1 py-10" ref={containerRef}>
        <h2 className="font-[montserrat] text-4xl font-bold underline decoration-4 text-center text-white fadeInAnim">
          {heading}
        </h2>
        <div className="grid lg:grid-cols-3 gap-7 gap-x-0 py-7 w-10/12 mx-auto">
          {cards.map((card, idx) => {
            const isMiddleColumn = idx % 3 === 1;
            const staggerClass = isMiddleColumn ? "lg:mt-7 lg:-mb-7" : "";

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
      <MedicalAssistBottomBG className="w-full" />
    </section>
  );
};


export default memo(MedicalAssistanceSection);
