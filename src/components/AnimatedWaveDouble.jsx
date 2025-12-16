import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the useGSAP plugin
gsap.registerPlugin(useGSAP, ScrollTrigger);

const AnimatedWaveDouble = () => {
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
          width: 1563, // TO state (Matches the SVG viewBox width)
          duration: 2.5,
          ease: "power3.inOut",
          delay: 0.2,
          // ScrollTrigger configuration in the 3rd argument (TO vars)
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%", // Starts when the top of this element hits 80% of the viewport height
            markers: false,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full h-fit relative overflow-hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1563 631"
        fill="none" 
        className="w-full h-full block"
      >
        <defs>
          {/* The Reveal Mask */}
          <mask id="waveRevealMaskDouble">
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

        {/* Group wrapping both paths with the mask applied */}
        <g mask="url(#waveRevealMaskDouble)">
          <path
            d="M4.16624 3.48431C3.94995 3.73793 3.73365 3.99156 3.51735 4.24519C24.1738 23.3822 46.1328 42.61 67.8072 61.1082C196.512 168.624 330.837 272.541 490.648 336.835C569.86 367.453 656.219 378.581 739.469 378.778C849.032 378.656 955.389 375.326 1057.65 405.565C1205.11 449.172 1346.75 519.3 1485.76 590.089C1511.39 603.369 1536.69 616.678 1561.58 630.292C1561.76 630.007 1561.93 629.722 1562.1 629.438C1538.46 613.698 1514.31 598.341 1489.73 583.094C1356.13 501.481 1218.77 423.375 1067.31 373.164C960.983 337.875 846.583 339.661 739.906 339.781C658.426 339.491 578.685 330.185 502.797 303.3C349.454 246.595 209.273 150.864 72.9949 54.4931C49.9422 37.8817 26.4735 20.6089 4.16624 3.48431Z"
            fill="#09A1CB"
          />
          <path
            d="M0.683903 0.000104746C0.455832 0.243199 0.227761 0.486293 -0.000309377 0.729387C19.3684 20.4961 39.8133 40.275 60.3536 59.639C192.473 180.934 330.471 301.516 502.453 372.372C565.708 396.345 633.229 408.99 700.153 412.237C828.088 417.293 951.362 404.14 1069.94 439.607C1198.49 475.812 1324.79 523.639 1449.77 573.654C1475.97 584.24 1501.99 594.904 1527.62 605.815C1527.77 605.515 1527.91 605.215 1528.06 604.915C1503.47 591.768 1478.41 578.958 1453.07 566.321C1332.17 506.438 1208.52 451.019 1079.03 409.122C956.127 367.151 823.834 378.318 702.22 373.291C638.054 370.132 575.356 359.065 514.992 337.763C352.077 275.227 206.657 162.803 65.8592 53.2862C43.8475 35.7371 21.7981 17.8359 0.683903 0.000104746Z"
            fill="#0E5B81"
          />
        </g>
      </svg>
    </div>
  );
};

export default AnimatedWaveDouble;
