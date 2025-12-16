import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Icon } from "@iconify/react";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    status: "Checking...",
    // General
    sectionCount: 0,
    // List Counts
    serviceCount: 0,
    testimonialCount: 0,
    faqCount: 0,
    assistanceCount: 0,
    achievementCount: 0,
    benefitCount: 0,
    whyUsBulletsCount: 0,
    // Single Section Status (Booleans to check if data exists)
    hasHero: false,
    hasAbout: false,
    hasServices: false,
    hasWhyUs: false,
    hasMedicalAssistance: false,
    hasAchievements: false,
    hasAppointment: false,
    hasTestimonials: false,
    hasContact: false,
    hasFAQ: false,
    hasMap: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const docRef = doc(db, "website_content", "homepage");
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const data = snap.data();

          setStats({
            status: "Online",
            // Count total active root keys (excluding system 'name')
            sectionCount: Object.keys(data).filter((k) => k !== "name").length,

            // --- Array Counts (The numbers) ---
            serviceCount: data.services?.services_list?.length || 0,
            testimonialCount: data.testimonial?.testimonials?.length || 0,
            faqCount: data.faq?.faqs?.length || 0,
            assistanceCount: data.medicalAssistance?.cards?.length || 0,
            achievementCount: data.achievment?.cards?.length || 0,
            benefitCount: data.why_us?.benefits_list?.length || 0,
            whyUsBulletsCount: data.why_us?.bullets?.length || 0,

            // --- Single Section Checks (Exists & has a heading?) ---
            hasHero: !!data.hero?.title,
            hasAbout: !!data.about?.name,
            hasServices: !!data.services?.heading,
            hasWhyUs: !!data.why_us?.heading,     
            hasMedicalAssistance: !!data.medicalAssistance?.heading,
            hasAchievements: !!data.achievement?.heading, 
            hasAppointment: !!data.appointment?.heading,
            hasTestimonials: !!data.testimonial?.heading,
            hasContact: !!data.contact?.phone,
            hasFAQ: !!data.faq?.heading,          
            hasMap: !!(data.map?.map_url || data.map?.src),
          });
        } else {
          setStats((prev) => ({ ...prev, status: "Not Configured" }));
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
        setStats((prev) => ({ ...prev, status: "Error" }));
      }
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#0E5B81] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 font-[battambang] max-w-7xl mx-auto animate-in fade-in duration-500 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0E5B81]">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-2">
          Real-time metrics for every section of your portfolio.
        </p>
      </div>

      {/* --- ROW 1: SYSTEM HEALTH --- */}
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
        System Health
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          label="Database Status"
          value={stats.status}
          icon="mdi:server-network"
          color={stats.status === "Online" ? "green" : "red"}
          subtext="Firebase Connection"
        />
        <StatCard
          label="Active Sections"
          value={stats.sectionCount}
          icon="mdi:view-dashboard-edit"
          color="orange"
          subtext="Total CMS Modules"
        />
        <div className="lg:col-span-2 bg-white border border-gray-100 p-6 rounded-2xl flex flex-wrap gap-4 items-center">
            <span className="text-sm font-bold text-gray-400 w-full">STATIC PAGES STATUS</span>
            <StatusBadge label="Hero" active={stats.hasHero} />
            <StatusBadge label="About" active={stats.hasAbout} />
            <StatusBadge label="Services" active={stats.hasServices} />
            <StatusBadge label="Why Us" active={stats.hasWhyUs} />
            <StatusBadge label="Medical Assistance" active={stats.hasMedicalAssistance} />
            <StatusBadge label="Achievements" active={stats.hasAchievements} />
            <StatusBadge label="Appointment" active={stats.hasAppointment} />
            <StatusBadge label="Testimonials" active={stats.hasTestimonials} />
            <StatusBadge label="Contact" active={stats.hasContact} />
            <StatusBadge label="FAQs" active={stats.hasFAQ} />
            <StatusBadge label="Map" active={stats.hasMap} />
        </div>
      </div>

      {/* --- ROW 2: CONTENT METRICS --- */}
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
        Content Listings
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
        <StatCard
          label="Services"
          value={stats.serviceCount}
          icon="medical-icon:i-interpreter-services"
          color="blue"
          subtext="Treatments Listed"
        />

        <StatCard
          label="Testimonials"
          value={stats.testimonialCount}
          icon="mdi:comment-quote"
          color="purple"
          subtext="Patient Reviews"
        />

        <StatCard
          label="Assistance Cards"
          value={stats.assistanceCount}
          icon="mdi:hand-heart"
          color="cyan"
          subtext="Medical Support Info"
        />

        <StatCard
          label="Achievements"
          value={stats.achievementCount}
          icon="mdi:trophy"
          color="indigo"
          subtext="Awards displayed"
        />

        <StatCard
          label="'Why Us' Benefits"
          value={stats.benefitCount}
          icon="mdi:star-circle"
          color="yellow"
          subtext="Key Features"
        />
        
         <StatCard
          label="'Why Us' Bullets"
          value={stats.whyUsBulletsCount}
          icon="mdi:format-list-bulleted"
          color="amber"
          subtext="Intro Points"
        />

        <StatCard
          label="FAQs"
          value={stats.faqCount}
          icon="wpf:faq"
          color="teal"
          subtext="Questions Answered"
        />
      </div>

      {/* --- ROW 3: QUICK ACTION BANNER --- */}
      <div className="bg-gradient-to-r from-[#0E5B81] to-[#0a4663] text-white p-8 rounded-2xl shadow-lg relative overflow-hidden group">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Ready to edit?</h2>
          <p className="opacity-90 max-w-xl text-sm md:text-base">
            Select any section from the sidebar to update content instantly. All changes reflect on the live site immediately.
          </p>
        </div>
        <Icon
          icon="mdi:pencil-circle"
          className="absolute -right-5 -bottom-10 text-9xl opacity-10 rotate-12 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500"
        />
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const StatCard = ({ label, value, icon, color, subtext }) => {
  const colors = {
    red: "bg-red-50 text-red-700 border-red-100",
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    purple: "bg-purple-50 text-purple-700 border-purple-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
    cyan: "bg-cyan-50 text-cyan-700 border-cyan-100",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-100",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    teal: "bg-teal-50 text-teal-700 border-teal-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
  };

  const activeColor = colors[color] || colors.blue;

  return (
    <div
      className={`p-6 rounded-2xl border ${activeColor} flex flex-col justify-between h-32 relative overflow-hidden group transition-all hover:shadow-md hover:-translate-y-1 bg-white`}
    >
      <div className="flex justify-between items-start z-10">
        <div>
          <span className="block text-3xl font-bold mb-1">{value}</span>
          <span className="text-sm font-semibold opacity-80">{label}</span>
        </div>
        <Icon icon={icon} className="text-3xl opacity-50" />
      </div>
      <span className="text-xs opacity-60 z-10 mt-auto">{subtext}</span>

      <Icon
        icon={icon}
        className="absolute -right-4 -bottom-4 text-8xl opacity-0 group-hover:opacity-10 transition-opacity rotate-12 ease-out duration-300"
      />
    </div>
  );
};

const StatusBadge = ({ label, active }) => (
    <div className={`px-3 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-2 ${active ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-400 border-gray-200'}`}>
        <div className={`w-2 h-2 rounded-full ${active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
        {label}
    </div>
);

export default DashboardHome;