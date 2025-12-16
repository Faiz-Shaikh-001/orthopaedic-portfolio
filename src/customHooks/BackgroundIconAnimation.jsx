import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const useBackgroundIconAnimation = (ref) => {
  useGSAP(
    () => {
      if (!ref.current) return;
      const iconsLeft = ref.current.querySelectorAll(".leftIconAnim");
      const iconsRight = ref.current.querySelectorAll(".rightIconAnim");

      gsap.set(iconsLeft, { opacity: 0, x: -50 });
      gsap.set(iconsRight, { opacity: 0, x: 50 });

      const tl = gsap.timeline();

      tl.to([iconsLeft, iconsRight], {
        opacity: 0.85,
        x: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.inOut",
      });

      gsap.to([iconsLeft, iconsRight], {
        y: "+=15",
        rotation: (i) => (i % 2 === 0 ? "+=5" : "-=5"),
        duration: (i) => 4 + Math.random() * 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.5,
          from: "random",
        },
        delay: 1,
      });
    },
    { scope: ref }
  );
};

export default useBackgroundIconAnimation;
