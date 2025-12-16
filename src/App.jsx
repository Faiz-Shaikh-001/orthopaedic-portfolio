import { Routes, Route } from "react-router-dom";

import "./App.css";

import AdminLogin from "./admin/AdminLogin";
import HeroEditor from "./admin/editors/HeroEditor";
import ServicesEditor from "./admin/editors/ServicesEditor";
import TestimonialEditor from "./admin/editors/TestimonialEditor";
import AboutEditor from "./admin/editors/AboutEditor";
import FAQEditor from "./admin/editors/FaqEditor";
import PublicWebsite from "./PublicWebsite";
import DashboardHome from "./admin/DashboardHome";
import WhyUsEditor from "./admin/editors/WhyUsEditor";
import MedicalAssistanceEditor from "./admin/editors/MedicalAssistanceEditor";
import AchievementsEditor from "./admin/editors/AchievementsEditor";
import AppointmentEditor from "./admin/editors/AppointmentEditor";
import ContactEditor from "./admin/editors/ContactEditor";
import MapEditor from "./admin/editors/MapEditor";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicWebsite />} />

      <Route
        path="/admin/*"
        element={
          <AdminLogin>
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="hero" element={<HeroEditor />} />
              <Route path="services" element={<ServicesEditor />} />
              <Route path="testimonials" element={<TestimonialEditor />} />
              <Route path="about" element={<AboutEditor />} />
              <Route path="faq" element={<FAQEditor />} />
              <Route path="why-us" element={<WhyUsEditor />} />
              <Route path="assistance" element={<MedicalAssistanceEditor />} />
              <Route path="achievements" element={<AchievementsEditor />} />
              <Route path="appointment" element={<AppointmentEditor />} />
              <Route path="contact" element={<ContactEditor />} />
              <Route path="map" element={<MapEditor />} />
            </Routes>
          </AdminLogin>
        }
      />
    </Routes>
  );
};

export default App;
