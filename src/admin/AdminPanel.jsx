import { signOut } from "firebase/auth";
import LogoComponent from "../components/logo";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

const AdminPanel = ({ auth, user, children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      <aside className="w-64 bg-[#0E5B81] text-white flex-col shadow-2xl z-10 hidden lg:flex h-screen sticky top-0">
        <div className="p-6 flex items-center justify-center bg-[#0a4663]">
          <div className="bg-white rounded-2xl py-2 px-1 ">
          <LogoComponent height="h-12" displayLogoText={false} />
          </div>
          <span className="grid font-[battambang] text-2xl ml-3 font-bold">
            <span>Admin</span><span>Panel</span>
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
          <SidebarLink to="/admin" icon="mdi:view-dashboard" text="Dashboard" />
          <SidebarLink
            to="/admin/hero"
            icon="mdi:presentation"
            text="Hero Section"
          />
          <SidebarLink
            to="/admin/about"
            icon="arcticons:about-you"
            text="About"
          />
          <SidebarLink
            to="/admin/services"
            icon="medical-icon:i-interpreter-services"
            text="Services"
          />
          <SidebarLink
            to="/admin/why-us"
            icon="mdi:star-circle"
            text="Why Us"
          />
          <SidebarLink
            to="/admin/assistance"
            icon="mdi:hand-heart"
            text="Assistance"
          />
          <SidebarLink
            to="/admin/achievements"
            icon="mdi:trophy"
            text="Achievements"
          />
          <SidebarLink
            to="/admin/appointment"
            icon="mdi:calendar-clock"
            text="Appointment"
          />
          <SidebarLink
            to="/admin/testimonials"
            icon="mdi:comment-quote"
            text="Testimonials"
          />
          <SidebarLink
            to="/admin/contact"
            icon="mdi:card-account-phone"
            text="Contact"
          />
          <SidebarLink to="/admin/faq" icon="wpf:faq" text="FAQ" />
          <SidebarLink to="/admin/map" icon="mdi:map-marker" text="Map" />
        </nav>

        <div className="p-4 bg-[#0a4663]">
          <div className="flex items-center gap-3 mb-4 opacity-80">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Icon icon="mdi:user" />
            </div>
            <div className="text-sm truncate w-32">{user.email}</div>
          </div>
          <button
            onClick={() => signOut(auth)}
            className="w-full py-2 bg-red-500/20 hover:bg-red-500/40 text-red-100 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:logout" /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 h-screen overflow-y-auto bg-gray-50 relative">
        {console.log(children)}
        {children}
      </main>
    </div>
  );
};

const SidebarLink = ({ to, icon, text }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
        isActive
          ? "bg-white text-[#0E5B81] shadow-lg font-bold"
          : "text-gray-100 hover:bg-white/10"
      }`}
    >
      <Icon
        icon={icon}
        className={`text-xl transition-colors ${
          isActive
            ? "text-[#0E5B81]"
            : "opacity-70 group-hover:opacity-100 group-hover:text-[#48CEF3]"
        }`}
      />
      <span className="text-sm tracking-wide">{text}</span>
    </Link>
  );
};

export default AdminPanel;
