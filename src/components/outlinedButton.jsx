import { useState } from "react";

const OutlinedButton = ({ text, colSpan='' , scrollToId}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 500);

    if (scrollToId) {
      const targetId = scrollToId.replace('#', '');
      const element = document.getElementById(targetId);
      
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const activeClasses = isClicked
    ? "bg-white text-[#0F5B81] border-transparent -translate-y-1"
    : "";

  const activeBackground = isClicked
    ? "after:scale-x-125 after:scale-y-150 after:opacity-0 after:transition after:duration-500"
    : "";

  return (
    <button
      onClick={handleClick}
      className={`relative group cursor-pointer ${colSpan} py-3 font-[Allura] text-3xl border-2 px-10 rounded-full bg-transparent font-semibold
        hover:bg-white hover:text-[#0F5B81] hover:border-transparent 
        hover:-translate-y-1 
        ${activeClasses}
        transition ease-in transform active:translate-y-0
       after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:rounded-full 
       after:bg-transparent hover:after:bg-white 
        group-hover:after:scale-x-125 group-hover:after:scale-y-150 group-hover:after:opacity-0 group-hover:after:transition group-hover:after:duration-500
        ${activeBackground}
        `}
    >
      {text}
    </button>
  );
};

export default OutlinedButton;
