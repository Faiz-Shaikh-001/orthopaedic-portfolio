import { useState } from "react";

const FilledButton = ({ colSpan, text, displayArrow = true, scrollToId, type="button", disabled = '', styles='' }) => {
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

  const activeArrowBar = isClicked ? "w-[calc(100%-10px)]" : "";
  const activeArrowSpin = isClicked ? "rotate-360" : "";
  const activeBackground = isClicked
    ? "after:scale-x-125 after:scale-y-150 after:opacity-0 after:transition after:duration-500"
    : "";

  return (
    <>
      <button
        onClick={handleClick}
        className={`relative group ${colSpan} ${styles}
          font-[allura] text-3xl text-white 
          px-10 py-3 pr-14
          rounded-full w-full 
          bg-linear-to-r from-[#09A1CB] via-[#3FB3D3] to-[#09A1CB] 
          inline-flex items-center justify-center cursor-pointer
          z-0
          after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:rounded-full 
          after:bg-linear-to-r after:from-[#09A1CB] after:via-[#3FB3D3] after:to-[#09A1CB] 
          group-hover:after:scale-x-125 group-hover:after:scale-y-150 group-hover:after:opacity-0 group-hover:after:transition group-hover:after:duration-500
          ${activeBackground}
        `}
        type={type}
        disabled={disabled}
      >
        <span className="z-10 pr-2">{text}</span>

        {/* Arrow Bar Container */}
        {displayArrow ? (
          <div
            className={`absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full bg-[#78d2eb] transition-[width] duration-500 
          group-hover:w-[calc(100%-10px)] 
          ${activeArrowBar}`}
          >
            {/* Arrow Icon */}
            <div
              className={`mr-3.5 flex items-center justify-center duration-500 
            group-hover:rotate-360 
            ${activeArrowSpin}`}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-neutral-50"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        ) : (
          ""
        )}
      </button>
    </>
  );
};

export default FilledButton;