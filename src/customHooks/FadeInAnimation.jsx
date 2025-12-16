import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const useFadeInAnimation = (ref, { top, direction, direction_val, opacity_target = 100 }) => {
  useGSAP(
    () => {
      if (!ref.current) return;
      const elements = gsap.utils.toArray(".fadeInAnim");

      gsap.set(elements, {
        x: direction == "x" ? direction_val : 0,
        y: direction == "y" ? direction_val : 0,
        opacity: 0,
      });

      gsap.to(elements, {
        scrollTrigger: {
          trigger: ref.current,
          start: `top ${top}`,
          markers: false,
        },
        x: 0,
        y: 0,
        opacity: opacity_target,
        stagger: 0.2,
        duration: 1.2,
        ease: "power2.inOut",
      });

      window.addEventListener("load", ScrollTrigger.refresh);

      return () => window.removeEventListener("load", ScrollTrigger.refresh);
    },
    { scope: ref }
  );
};

export default useFadeInAnimation;
