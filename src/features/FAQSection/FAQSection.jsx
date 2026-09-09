import {
  memo,
  useRef,
  useState,
} from "react";

import { Icon } from "@iconify/react";

import AnimatedWaveDouble from "../../components/AnimatedWaveDouble";

import {
  PlusAngularIcon,
  PlusIcon,
} from "../../assets/exportAssets";

import useFadeInAnimation from "../../customHooks/FadeInAnimation";

import FAQSkeleton from "./FAQSkeleton";


const FAQContent = ({ content }) => {
  const {
    heading,
    sub_heading,
    faqs = [],
  } = content;

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(null);

  const rightIconContainerRef =
    useRef(null);

  const leftIconContainerRef =
    useRef(null);


  useFadeInAnimation(
    leftIconContainerRef,
    {
      top: "70%",
      direction: "x",
      direction_val: -80,
      opacity_target: "80%",
    }
  );


  useFadeInAnimation(
    rightIconContainerRef,
    {
      top: "70%",
      direction: "x",
      direction_val: 80,
      opacity_target: "50%",
    }
  );


  const toggleFAQ = (index) => {
    setActiveIndex((previous) =>
      previous === index
        ? null
        : index
    );
  };


  return (
    <section
      className="relative py-20 z-10"
      id="FAQs"
    >

      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">

        <div className="absolute w-full h-full top-0 lg:opacity-100">
          <AnimatedWaveDouble />
        </div>


        <div
          ref={leftIconContainerRef}
          className="absolute bottom-0 left-0"
        >

          <PlusIcon
            aria-hidden="true"
            className="h-24 lg:h-40 -rotate-25 opacity-30 text-[#0E5B81] fadeInAnim"
          />

        </div>


        <div
          ref={rightIconContainerRef}
          className="absolute top-0 right-0"
        >

          <PlusAngularIcon
            aria-hidden="true"
            className="h-24 lg:h-40 -rotate-25 opacity-30 text-[#0E5B81] fadeInAnim"
          />

        </div>

      </div>


      <div className="text-center mb-10 px-4 relative z-10">

        <h3 className="font-[battambang] text-xl font-bold text-[#0E5B81] uppercase tracking-wider mb-2">
          {heading}
        </h3>

        <h2 className="font-[battambang] text-3xl lg:text-4xl font-bold text-gray-900">
          {sub_heading}
        </h2>

      </div>


      <div className="w-11/12 max-w-7xl mx-auto relative z-10">

        <div className="grid md:grid-cols-2 gap-5 lg:gap-8 items-start">

          {faqs.map((faq, index) => {
            const isOpen =
              activeIndex === index;

            return (
              <div
                key={`${faq.question}-${index}`}
                className="bg-white rounded-3xl drop-shadow-md hover:drop-shadow-xl transition-shadow duration-300"
              >

                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() =>
                    toggleFAQ(index)
                  }
                  className="cursor-pointer p-4 lg:p-3 flex gap-4 items-start select-none group w-full text-left"
                >

                  <Icon
                    icon="material-symbols:chevron-right-rounded"
                    className={`text-2xl lg:text-3xl text-[#0E5B81] transition-transform duration-300 shrink-0 mt-0.5 group-hover:text-[#48CEF3] ${
                      isOpen
                        ? "rotate-90"
                        : ""
                    }`}
                  />


                  <div className="grid gap-2 w-full">

                    <h5
                      className={`font-[battambang] text-lg lg:text-xl transition-colors duration-300 ${
                        isOpen
                          ? "font-bold text-[#0E5B81]"
                          : "text-gray-800 font-semibold"
                      }`}
                    >
                      {faq.question}
                    </h5>


                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >

                      <div className="overflow-hidden">

                        <hr className="my-3 border-[#0E5B81]/10" />

                        <p className="text-gray-600 text-base lg:text-lg font-[inter] leading-relaxed pb-2">
                          {faq.answer}
                        </p>

                      </div>

                    </div>

                  </div>

                </button>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};


const FAQSection = ({ content }) => {
  if (!content) {
    return <FAQSkeleton />;
  }

  return (
    <FAQContent
      content={content}
    />
  );
};


export default memo(FAQSection);