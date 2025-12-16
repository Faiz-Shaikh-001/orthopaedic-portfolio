import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const useNumberIncrementAnimation = (ref) => {
  useGSAP(
    () => {
      if (!ref.current) return;
      const items = ref.current.querySelectorAll(".data");

      items.forEach((item) => {
        const targetValue = item.getAttribute("data-target");
        gsap.to(item, {
          textContent: targetValue,
          duration: 4,
          ease: "power1.out",
          snap: { textContent: 1 },
          onUpdate: function () {
            item.innerHTML = numberWithCommas(
              Math.ceil(item.textContent)
            );
          },
        });
      });

      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    { scope: ref }
  );
};

export default useNumberIncrementAnimation;
