import { memo } from "react";
import { Icon } from "@iconify/react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  NHLogo,
  YoutubeIcon,
} from "../../assets/exportAssets";
import FooterSkeleton from "./FooterSkeleton";

const ICON_COMPONENTS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedIn: LinkedInIcon,
  youtube: YoutubeIcon,
  default: NHLogo,
};

// 1. HELPER COMPONENT: Reusable Social Links
const SocialIcons = ({ links }) => (
  <div className="flex w-11/12 justify-between">
    {links.map((e, idx) => {
      const IconComponent =
        ICON_COMPONENTS[e.icon] || ICON_COMPONENTS["default"];
      return (
        <a
          key={idx}
          href={e.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit our ${e.icon} page`}
          className="relative h-fit group transition-transform hover:-translate-y-1"
        >
          {/* Blend mode background effect */}
          <div className="absolute bg-[#0C1C3A] w-full h-full mix-blend-lighten rounded-lg pointer-events-none"></div>
          <IconComponent className="h-12 w-12" />
        </a>
      );
    })}
  </div>
);

const FooterSection = ({ content }) => {
  // 2. Safety Check
  if (!content) return <FooterSkeleton />;

  const {
    description,
    contact = {}, // Default object to prevent crash
    social_links = [],
    quick_links = [],
  } = content;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1933] text-white z-50 relative" id="Footer">
      <div className="w-10/12 grid lg:grid-cols-4 mx-auto pt-15 gap-20">
        {/* --- COLUMN 1: Brand & Desktop Socials --- */}
        <div className="grid gap-8 h-fit w-full">
          <div className="flex items-center gap-2 h-fit w-max">
            <NHLogo className="bg-white rounded-xl h-15 w-15 pr-2" />
            <div className="grid">
              <span className="font-[battambang] text-xl leading-4">
                DocnaS Clinic
              </span>
              <span className="font-[allura] text-base opacity-80">
                Dr. Nasir Hussain — Orthopaedic Surgeon
              </span>
            </div>
          </div>

          <p className="font-[inter] font-medium text-base h-fit leading-relaxed opacity-90">
            {description}
          </p>

          <div className="hidden lg:grid h-fit gap-4">
            <span className="font-[inter] text-xl font-semibold">
              Follow Us
            </span>
            <hr className="w-11/12 opacity-30" />
            <SocialIcons links={social_links} />
          </div>
        </div>

        {/* --- COLUMN 2: Contact Details --- */}
        <div className="w-full">
          <h4 className="relative font-[inter] font-semibold text-xl after:absolute after:w-9/12 after:h-1 after:bg-white/30 after:-bottom-2 after:right-0 pb-2 mb-8 w-fit">
            Contact Details
          </h4>

          <div className="grid gap-6 font-[battambang]">
            <div className="grid gap-1">
              <span className="flex items-center gap-2 font-bold text-[#48CEF3]">
                <Icon icon="mdi:location" className="text-xl" /> Address:
              </span>
              <span className="text-base opacity-90 pl-7">
                {contact.address}
              </span>
            </div>

            <div className="flex items-center gap-2 text-base">
              <Icon icon="mdi-light:phone" className="text-[#48CEF3] text-xl" />
              Phone: {contact.phone}
            </div>

            <div className="flex items-center gap-2 text-base">
              <span className="text-xl">✉️</span>
              Email: {contact.email}
            </div>

            <div className="grid w-fit font-[inter] font-semibold bg-white/5 p-3 rounded-lg">
              <span className="w-max">
                <span>🕜 Timing:</span>
                <span className="text-right"> {contact.timing}</span>
              </span>
              <span className="text-right text-xs opacity-70 italic">
                (By Appointment)
              </span>
            </div>
          </div>
        </div>

        {/* --- COLUMN 3: Quick Links --- */}
        <div className="grid justify-center h-fit gap-4 items-center">
          <h4 className="relative font-[inter] font-semibold text-xl after:absolute after:w-9/12 after:h-1 after:bg-white/30 after:-bottom-2 after:right-0 pb-2 mb-4 w-fit">
            Quick Links
          </h4>

          <ul className="list-disc pl-4 grid gap-3">
            {quick_links.map((link, idx) => (
              // 3. FIX: Key must be on the <li>
              <li key={idx} className="group marker:text-[#48CEF3]">
                <a
                  href={link.href}
                  className="w-fit relative inline-block after:absolute after:w-0 after:h-0.5 after:left-0 after:bottom-0 after:bg-[#48CEF3] group-hover:after:w-full after:transition-all after:ease-in-out after:duration-300"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* --- COLUMN 4: CTA & Mobile Socials --- */}
        <div className="grid w-full h-fit gap-8">
          <h4 className="relative font-[inter] font-semibold text-xl after:absolute after:w-9/12 after:h-1 after:bg-white/30 after:-bottom-2 after:right-0 pb-2 w-fit">
            Make Appointment
          </h4>

          <a
            href={`tel:${contact.phone}`}
            className="flex p-5 rounded-2xl items-center bg-[#0F5B81] w-full h-fit gap-4 hover:bg-[#146c96] transition-colors group"
          >
            <Icon
              icon="mdi:phone"
              className="bg-[#48CEF3] text-black text-5xl p-2 rounded-lg group-hover:scale-110 transition-transform"
            />
            <div className="grid">
              <span className="font-[inter] font-semibold text-lg">
                Call Us
              </span>
              <span className="font-[battambang] font-bold text-xl w-max">
                {contact.phone}
              </span>
            </div>
          </a>

          <span className="font-[inter] font-semibold text-sm hidden lg:block opacity-70 leading-relaxed">
            {description}
          </span>

          {/* Mobile Socials (Visible only on small screens) */}
          <div className="lg:hidden grid h-fit gap-4 mt-4">
            <span className="font-[inter] text-xl font-semibold">
              Follow Us
            </span>
            <hr className="w-11/12 opacity-30" />
            <SocialIcons links={social_links} />
          </div>
        </div>
      </div>

      <hr className="mt-15 opacity-20" />

      <div className="py-6 w-10/12 mx-auto">
        <p className="font-[inter] text-sm text-center lg:text-right opacity-60">
          Copyright ©️ {currentYear} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default memo(FooterSection);
