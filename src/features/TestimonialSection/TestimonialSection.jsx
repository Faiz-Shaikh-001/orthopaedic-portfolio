import { useState, useEffect, memo } from "react";
import { Icon } from "@iconify/react";
import { TestimonialBG } from "../../assets/exportAssets";
import { motion, AnimatePresence } from "framer-motion";
import TestimonialSkeleton from "./TestimonialSkeleton";

const slideVariants = {
  enter: (direction) => ({
    x: direction === "next" ? "100%" : "-100%",
    opacity: 0,
    position: "absolute",
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    position: "absolute",
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction === "next" ? "-100%" : "100%",
    opacity: 0,
    position: "absolute",
  }),
};

const swipeTransition = {
  duration: 0.6,
  ease: [0.43, 0.13, 0.23, 0.96],
};

function TestimonialSection({ content }) {
  if (!content) return <TestimonialSkeleton />;

  const { heading, testimonials = [] } = content;

  if (testimonials.length === 0) return <TestimonialSkeleton />;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  const handleNext = () => {
    setDirection("next");
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setDirection("prev");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  const currentData = testimonials[currentIndex];

  return (
    <section className="" id="Testimonials">
      <h1 className="text-center font-[inter] font-semibold text-4xl underline decoration-4">
        {heading}
      </h1>
      <div className="relative flex items-center pt-20">
        <TestimonialBG className="absolute -z-10 w-full h-[120%]"></TestimonialBG>

        <Icon
          icon="bxs:left-arrow"
          className="text-5xl cursor-pointer hover:opacity-70 transition-opacity z-20"
          onClick={handlePrev}
        />

        <div className="relative h-96 w-full overflow-hidden mx-4">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={swipeTransition}
              className="w-full h-full flex flex-col items-center justify-center"
            >
              <div className="relative flex items-center justify-center mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden z-10">
                  <img
                    src={currentData.image || "https://placehold.co/100"}
                    alt={currentData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute w-28 h-28 border-4 border-dashed border-[#256583] rounded-full animate-[spin_10s_linear_infinite]" />
              </div>

              <h3 className="text-center mb-4 font-[jaldi] font-bold text-3xl text-black">
                {currentData.name}
              </h3>

              <div className="relative w-10/12 md:w-8/12 text-center">
                <Icon
                  icon="raphael:quote"
                  className="absolute -top-4 -left-4 text-3xl lg:text-5xl text-black"
                />
                <p className="font-[inter] font-semibold text-lg lg:text-2xl text-[#045065] italic px-6">
                  "{currentData.text}"
                </p>
                <Icon
                  icon="raphael:quote"
                  className="absolute -bottom-4 -right-4 text-3xl lg:text-5xl text-black rotate-180"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <Icon
          icon="bxs:right-arrow"
          className="text-5xl cursor-pointer hover:opacity-70 transition-opacity z-20"
          onClick={handleNext}
        />
      </div>
    </section>
  );
}

export default memo(TestimonialSection);
