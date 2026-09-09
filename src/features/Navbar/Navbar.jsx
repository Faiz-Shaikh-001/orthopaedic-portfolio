import {
  memo,
  useState,
} from "react";

import {
  MailIconURL,
  CallIconURL,
} from "../../assets/exportAssets";

import LogoComponent from "../../components/logo";
import FilledButton from "../../components/filledButton";

import NavbarSkeleton from "./NavbarSkeleton";


const NAV_LINKS = [
  {
    text: "Home",
    url: "#Home",
  },
  {
    text: "About Us",
    url: "#About",
  },
  {
    text: "Our Services",
    url: "#Services",
  },
  {
    text: "Why Us",
    url: "#WhyUs",
  },
  {
    text: "Assistance",
    url: "#MedicalAssistance",
  },
  {
    text: "Achievements",
    url: "#Achievement",
  },
  {
    text: "Testimonials",
    url: "#Testimonials",
  },
  {
    text: "Appointment",
    url: "#Appointment",
  },
  {
    text: "Contact Us",
    url: "#Contact",
  },
  {
    text: "FAQs",
    url: "#FAQs",
  },
];


const NavbarContent = ({ content }) => {
  const contact =
    content.contact ?? {
      email: "contact@drnasir.com",
      phone: "+91 98765 43210",
    };


  const [
    isMenuOpen,
    setIsMenuOpen,
  ] = useState(false);


  const contactInfo = [
    {
      type: "email",
      imageUrl: MailIconURL,
      title: "Mail Us",
      content: contact.email,
    },
    {
      type: "phone",
      imageUrl: CallIconURL,
      title: "Call Us",
      content: contact.phone,
    },
  ];


  const toggleMenu = () => {
    setIsMenuOpen((previous) =>
      !previous
    );
  };


  const handleSmoothScroll = (
    event,
    url
  ) => {
    event.preventDefault();

    setIsMenuOpen(false);

    const targetId =
      url.replace("#", "");

    const element =
      document.getElementById(
        targetId
      );

    element?.scrollIntoView({
      behavior: "smooth",
    });
  };


  return (
    <nav className="relative z-50 bg-white shadow-sm">

      <div
        className={`fixed top-0 left-0 h-screen w-[75%] bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl xl:hidden ${
          isMenuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        <div className="flex flex-col h-full py-10 px-8 gap-6 overflow-y-auto">

          <LogoComponent
            height="h-10"
            displayLogoText
          />

          <hr className="border-gray-100" />


          <div className="grid gap-6">

            {NAV_LINKS.map((link) => (
              <a
                key={link.url}
                href={link.url}
                onClick={(event) =>
                  handleSmoothScroll(
                    event,
                    link.url
                  )
                }
                className="font-[battambang] text-lg text-gray-800 hover:text-[#09A1CB] transition-colors"
              >
                {link.text}
              </a>
            ))}

          </div>

        </div>

      </div>


      {isMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() =>
            setIsMenuOpen(false)
          }
          className="fixed inset-0 bg-black/50 z-40 xl:hidden backdrop-blur-sm"
        />
      )}


      <div
        className={`flex relative items-center px-4 py-4 xl:hidden ${
          isMenuOpen
            ? "bg-transparent"
            : "bg-white"
        } z-50`}
      >

        {!isMenuOpen && (
          <LogoComponent
            height="h-10"
            displayLogoText={false}
          />
        )}


        <div className="w-full" />


        <button
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
          className="flex flex-col justify-center items-center gap-1.5 w-10 h-10"
        >

          <span
            className={`h-1 w-8 bg-black rounded-full transition-all duration-300 ${
              isMenuOpen
                ? "rotate-45 translate-y-2.5"
                : ""
            }`}
          />

          <span
            className={`h-1 w-8 bg-black rounded-full transition-all duration-300 ${
              isMenuOpen
                ? "opacity-0"
                : "opacity-100"
            }`}
          />

          <span
            className={`h-1 w-8 bg-black rounded-full transition-all duration-300 ${
              isMenuOpen
                ? "-rotate-45 -translate-y-2.5"
                : ""
            }`}
          />

        </button>

      </div>


      <div className="w-11/12 mx-auto hidden xl:block bg-white pb-2">

        <div className="grid grid-flow-col items-center py-4">

          <LogoComponent
            height="h-15"
            displayLogoText
          />


          <div className="flex justify-between">

            {contactInfo.map(
              (item) => (
                <a
                  href={
                    item.type === "email"
                      ? `mailto:${item.content}`
                      : `tel:${item.content}`
                  }
                  key={item.type}
                  className="flex items-center justify-around w-full"
                >

                  <div className="flex items-center hover:scale-110 transition-all ease-in-out duration-200 cursor-pointer">

                    <img
                      src={item.imageUrl}
                      alt=""
                      className="w-10 h-10"
                    />

                    <div className="grid h-fit font-[battambang] text-base leading-4 ml-2">

                      <span>
                        {item.title}
                      </span>

                      <span className="text-[#6C6C6C]">
                        {item.content}
                      </span>

                    </div>

                  </div>


                  <div className="h-[120%] w-[1%] bg-[black] right-0 rounded-full opacity-30 mx-5" />

                </a>
              )
            )}


            <FilledButton
              text="Book Appointment"
              scrollToId="#Contact"
            />

          </div>

        </div>


        <hr className="border-gray-200 mb-4" />


        <div className="flex items-center justify-between">

          {NAV_LINKS.map((link) => (
            <a
              key={link.url}
              href={link.url}
              onClick={(event) =>
                handleSmoothScroll(
                  event,
                  link.url
                )
              }
              className="relative font-[battambang] text-base 2xl:text-lg cursor-pointer link-wipe-animation text-gray-700 hover:text-black py-2"
            >
              {link.text}
            </a>
          ))}

        </div>

      </div>

    </nav>
  );
};


const Navbar = ({ content }) => {
  if (!content) {
    return <NavbarSkeleton />;
  }

  return (
    <NavbarContent
      content={content}
    />
  );
};


export default memo(Navbar);