import { Icon } from "@iconify/react";
import { memo } from "react";

const CARD_VARIANTS = {
  default: {
    bg: "bg-white",
    title: "text-black",
    text: "text-gray-600",
    icon: "text-[#09A1CB]",
    cta: "text-[#09A1CB]",
  },
  dark: {
    bg: "bg-[#000E44]",
    title: "text-white",
    text: "text-gray-200",
    icon: "text-[#09A1CB]",
    cta: "text-[#09A1CB]",
  },
  accent: {
    bg: "bg-[#48CEF3]",
    title: "text-white",
    text: "text-white/90",
    icon: "text-white",
    cta: "text-white",
  },
};

const Card = memo(({ data, className , variant="default"}) => {
  const styles = CARD_VARIANTS[variant]
  const { icon_name, title, content, cta_text } = data;

  return (
    <div
      className={`relative group w-11/12 drop-shadow-xl/20 mx-auto ${styles.bg} ${className} p-5 fadeInAnim hover:-translate-y-4! cursor-pointer overflow-clip transition-all ease-in-out duration-500 hover:shadow-2xl/50 hover:shadow-white`}
    >
      <Icon
        icon={icon_name || "healthicons:doctor-male-outline"}
        className={`${styles.icon} text-5xl mb-4`}
      />
      <Icon
        icon={icon_name || "healthicons:doctor-male-outline"}
        className={`${styles.icon} text-9xl absolute -bottom-40 right-0 opacity-0 group-hover:bottom-0 z-100 transition-all ease-in-out duration-500 group-hover:opacity-25`}
      />
      <h3
        className={`${styles.title} my-2 text-2xl font-bold font-[battambang]`}
      >
        {title}
      </h3>
      <p
        className={`mb-2 line-clamp-4 text-lg font-normal ${styles.text} leading-relaxed`}
      >
        {content}
      </p>
      <button className={`${styles.cta}`}>
        {cta_text || "Read more"}
        <span> →</span>
      </button>
    </div>
  );
});

export default Card;