import {
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Icon } from "@iconify/react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  TestimonialBG,
} from "../../assets/exportAssets";

import TestimonialSkeleton from "./TestimonialSkeleton";


const slideVariants = {
  enter: (direction) => ({
    x:
      direction === "next"
        ? "100%"
        : "-100%",

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

    x:
      direction === "next"
        ? "-100%"
        : "100%",

    opacity: 0,

    position: "absolute",
  }),
};


const swipeTransition = {
  duration: 0.6,
  ease: [
    0.43,
    0.13,
    0.23,
    0.96,
  ],
};


const TestimonialContent = ({
  content,
}) => {
  const {
    heading,
    testimonials,
  } = content;

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  const [
    direction,
    setDirection,
  ] = useState("next");


  const testimonialCount =
    testimonials.length;


  const handleNext = useCallback(
    () => {
      setDirection("next");

      setCurrentIndex(
        (previousIndex) =>
          previousIndex ===
          testimonialCount - 1
            ? 0
            : previousIndex + 1
      );
    },
    [testimonialCount]
  );


  const handlePrev = useCallback(
    () => {
      setDirection("prev");

      setCurrentIndex(
        (previousIndex) =>
          previousIndex === 0
            ? testimonialCount - 1
            : previousIndex - 1
      );
    },
    [testimonialCount]
  );


  useEffect(() => {
    const intervalId =
      window.setInterval(
        handleNext,
        5000
      );

    return () => {
      window.clearInterval(
        intervalId
      );
    };
  }, [handleNext]);


  const currentData =
    testimonials[currentIndex];


  return (
    <section id="Testimonials">

      <h1 className="text-center font-[inter] font-semibold text-4xl underline decoration-4">
        {heading}
      </h1>


      <div className="relative flex items-center pt-20">

        <TestimonialBG className="absolute -z-10 w-full h-[120%]" />


        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={handlePrev}
          className="z-20"
        >

          <Icon
            icon="bxs:left-arrow"
            className="text-5xl cursor-pointer hover:opacity-70 transition-opacity"
          />

        </button>


        <div className="relative h-96 w-full overflow-hidden mx-4">

          <AnimatePresence
            initial={false}
            custom={direction}
          >

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
                    src={
                      currentData.image ||
                      "https://placehold.co/100"
                    }
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
                  “{currentData.text}”
                </p>

                <Icon
                  icon="raphael:quote"
                  className="absolute -bottom-4 -right-4 text-3xl lg:text-5xl text-black rotate-180"
                />

              </div>

            </motion.div>

          </AnimatePresence>

        </div>


        <button
          type="button"
          aria-label="Next testimonial"
          onClick={handleNext}
          className="z-20"
        >

          <Icon
            icon="bxs:right-arrow"
            className="text-5xl cursor-pointer hover:opacity-70 transition-opacity"
          />

        </button>

      </div>

    </section>
  );
};


const TestimonialSection = ({
  content,
}) => {
  if (
    !content ||
    !Array.isArray(
      content.testimonials
    ) ||
    content.testimonials.length === 0
  ) {
    return <TestimonialSkeleton />;
  }

  return (
    <TestimonialContent
      content={content}
    />
  );
};


export default memo(
  TestimonialSection
);