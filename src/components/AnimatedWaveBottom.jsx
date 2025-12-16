import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the useGSAP plugin
gsap.registerPlugin(useGSAP, ScrollTrigger);

const AnimatedWaveBottom = () => {
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
        // Updated viewBox to match your new SVG dimensions (height 612)
        viewBox="0 0 1440 612"
        preserveAspectRatio="none"
        fill="none"
        className="w-full h-auto"
      >
        <defs>
          {/* 1. Simplified Gradient based on your input colors */}
          <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#045065" />
            <stop offset="100%" stopColor="#09A1CB" />
          </linearGradient>

          {/* 2. The Reveal Mask */}
          <mask id="waveRevealMask3">
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
          fill="url(#waveGradient3)"
          mask="url(#waveRevealMask3)"
          d="M-328.306 399.507C-328.102 399.771 -327.899 400.035 -327.695 400.299C-293.315 378.325 -257.147 358.691 -220.391 340.309C-63.4306 262.737 104.253 210.568 269.074 187.602C309.16 182.287 347.938 183.979 385.887 192.653C511.857 221.172 616.141 334.778 731.958 438.74C839.237 541.99 1024.62 658.315 1204.72 591.94C1232.37 583.261 1258.78 571.882 1283.42 559.222C1464.12 460.739 1586.21 310.281 1695.69 157.642C1720.01 122.737 1742.67 88.3555 1764.74 51.3448C1738.1 34.2298 1711.46 17.1149 1684.81 -4.00284e-05C1662.37 30.9465 1637.19 63.2994 1611.84 94.5807C1498.15 232.434 1371.99 369.948 1226.3 448.036C1206.83 458.046 1186.82 466.577 1167.23 472.743C900.269 569.651 757.761 172.986 411.22 77.4042C357.506 65.6991 300.763 67.1029 248.625 79.4276C68.0385 122.914 -89.7288 216.769 -231.633 322.077C-264.936 347.028 -297.479 372.605 -328.306 399.507Z"
        />
      </svg>
    </div>
  );
};

export default AnimatedWaveBottom;
