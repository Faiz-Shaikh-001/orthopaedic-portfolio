import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the useGSAP plugin
gsap.registerPlugin(useGSAP, ScrollTrigger);

const AnimatedWaveTopBottom = () => {
  const containerRef = useRef(null);
  const maskRectRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        maskRectRef.current,
        {
          width: 0, // FROM state
        },
        {
          width: 1440, // TO state (Matches the SVG viewBox width)
          duration: 2.5,
          ease: "power3.inOut",
          delay: 0.5,
          // ScrollTrigger configuration in the 3rd argument (TO vars)
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%", // Starts when the top of this wave hits 80% of the viewport height
            markers: false,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full relative overflow-hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        // Updated viewBox to match your new SVG dimensions (height 678)
        viewBox="0 0 1440 678"
        preserveAspectRatio="none"
        fill="none"
        className="w-full h-auto"
      >
        <defs>
          {/* 1. Simplified Gradient based on your input colors */}
          <linearGradient
            id="waveGradient2"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#0F5B81" />
            <stop offset="50%" stopColor="#37ACD1" />
            <stop offset="100%" stopColor="#48CDF2" />
          </linearGradient>

          {/* 2. The Reveal Mask */}
          <mask id="waveRevealMask2">
            <rect
              ref={maskRectRef}
              x="0"
              y="0"
              width="0"
              height="100%"
              fill="white"
            />
          </mask>
        </defs>

        {/* 3. The Path with the new gradient and mask applied */}
        <path
          opacity="0.8"
          fill="url(#waveGradient2)"
          mask="url(#waveRevealMask2)"
          d="M-134.37 676.672C-134.123 676.897 -133.877 677.121 -133.63 677.345C-108.18 654.558 -81.0411 633.774 -53.1742 613.908C65.6196 529.992 196.468 467.139 326.958 423.446C359.327 412.876 391.743 407.337 424.867 406.265C648.648 385.542 884.931 698.991 1213.13 542.127C1223.53 536.577 1233.85 530.449 1243.54 524.179C1391.05 422.742 1469.96 277.439 1535.5 133.535C1549.61 101.105 1562.42 69.0978 1574.35 34.0172C1544.78 22.6781 1515.22 11.3391 1485.65 9.53674e-06C1472.47 28.3657 1456.84 58.8357 1441.21 87.526C1369.72 216.554 1284.71 346.097 1175.61 419.243C1168.62 423.77 1161.35 428.082 1154.23 431.891C951.446 553.577 733.059 287.737 419.955 288.367C373.62 290.48 327.317 302.234 285.861 321.572C146.206 387.54 31.8076 489.313 -67.3966 597.892C-90.7314 623.636 -113.278 649.653 -134.37 676.672Z"
        />
      </svg>
    </div>
  );
};

export default AnimatedWaveTopBottom;