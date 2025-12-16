import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(TextPlugin, ScrollTrigger);

const useTypewriterEffectAnimation = (fullText, cursorRef, textRef) => {
  useGSAP(() => {
    if (!cursorRef.current || !textRef.current) return;

    const cursor = cursorRef.current;
    const target = textRef.current;

    gsap.from(target, {
      autoAlpha: 0,
      y: 20,
      duration: 0.8,
      scrollTrigger: {
        trigger: target,
        start: "top 85%",
      },
      onComplete: () => {
        gsap.to(target, {
          text: { value: fullText },
          duration: 7,
          ease: "none",
        });

        gsap.fromTo(
          cursor,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.3,
            repeat: -1,
            ease: "steps(1)",
          }
        );
      },
    });
  });
};

export default useTypewriterEffectAnimation;
