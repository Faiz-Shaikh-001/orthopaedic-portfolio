import { useState, memo } from "react";
import { MailIconURL, CallIconURL } from "../../assets/exportAssets";
import LogoComponent from "../../components/logo";
import FilledButton from "../../components/filledButton";
import NavbarSkeleton from "./NavbarSkeleton";

const NAV_LINKS = [
  { text: "Home", url: "#Home" },
  { text: "About Us", url: "#About" },
  { text: "Our Services", url: "#Services" },
  { text: "Why Us", url: "#WhyUs" },
  { text: "Assistance", url: "#MedicalAssistance" },
  { text: "Achievements", url: "#Achievement" }, // Fixed ID match
  { text: "Testimonials", url: "#Testimonials" },
  { text: "Appointment", url: "#Appointment" },
  { text: "Contact Us", url: "#Contact" },
  { text: "FAQs", url: "#FAQs" },
];

const Navbar = ({ content }) => {
  if (!content) return <NavbarSkeleton />;

  const {
    contact = {
      email: "contact@drnasir.com",
      phone: "+91 98765 43210",
    },
  } = content;

  const contactInfo = [
    {type:"email", imageUrl: MailIconURL, title: "Mail Us", content: contact.email },
    {type:"phone", imageUrl: CallIconURL, title: "Call Us", content: contact.phone },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleSmoothScroll = (e, url) => {
    e.preventDefault();
    setIsMenuOpen(false); 

    const targetId = url.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="relative z-50 bg-white shadow-sm">
      {/* --- MOBILE SIDEBAR --- */}
      <div
        className={`fixed top-0 left-0 h-screen w-[75%] bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl xl:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full py-10 px-8 gap-6 overflow-y-auto">
          <LogoComponent height="h-10" displayLogoText={true} />
          <hr className="border-gray-100" />
          <div className="grid gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.url}
                href={link.url}
                onClick={(e) => handleSmoothScroll(e, link.url)}
                className="font-[battambang] text-lg text-gray-800 hover:text-[#09A1CB] transition-colors"
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for Mobile Sidebar (Click to close) */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 xl:hidden backdrop-blur-sm"
        />
      )}

      {/* --- MOBILE HEADER --- */}
      <div
        className={`flex relative items-center px-4 py-4 xl:hidden ${
          isMenuOpen ? "bg-transparent" : "bg-white"
        } relative z-50`}
      >
        {isMenuOpen ? (
          ""
        ) : (
          <LogoComponent height="h-10" displayLogoText={false} />
        )}

        {/* Hamburger Button */}
        <div className="w-full"></div>
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
          className="flex flex-col justify-center items-center gap-1.5 w-10 h-10"
        >
          <span
            className={`h-1 w-8 bg-black rounded-full transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2.5" : ""
            }`}
          />
          <span
            className={`h-1 w-8 bg-black rounded-full transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-1 w-8 bg-black rounded-full transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
            }`}
          />
        </button>
      </div>

      {/* --- DESKTOP HEADER --- */}
      <div className="w-11/12 mx-auto hidden xl:block bg-white pb-2">
        {/* Top Row: Logo & Contact Info */}
        <div className="grid grid-flow-col items-center py-4">
          <LogoComponent height="h-15" displayLogoText={true} />

          <div className="flex justify-between">
            {contactInfo.map((e, index) => {
              return (
                <a
                href={e.type === "email"? `mailto:${e.content}`: `tel:${e.content}`}
                  key={index}
                  className="flex items-center justify-around w-full"
                >
                  <div className="flex items-center hover:scale-110 transition-all ease-in-out duration-200 cursor-pointer">
                    <img src={e.imageUrl} alt="" className="w-10 h-10" />

                    <div className="grid h-fit font-[battambang] text-base leading-4 ml-2">
                      <span className="">{e.title}</span>

                      <span className="text-[#6C6C6C]">{e.content}</span>
                    </div>
                  </div>

                  <div className="h-[120%] w-[1%] bg-[black] right-0 rounded-full opacity-30 mx-5"></div>
                </a>
              );
            })}

            <FilledButton text={"Book Appointment"} scrollToId={"#Contact"} />
          </div>
        </div>

        <hr className="border-gray-200 mb-4" />

        {/* Bottom Row: Navigation Links */}
        <div className="flex items-center justify-between">
          {NAV_LINKS.map((link) => (
            <a
              key={link.url}
              href={link.url}
              onClick={(e) => handleSmoothScroll(e, link.url)}
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

export default memo(Navbar);
