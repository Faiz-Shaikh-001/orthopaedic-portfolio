import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import SeedData from "./seedData";

import {
  Navbar,
  HeroSection,
  AboutSection,
  ServicesSection,
  WhyUsSection,
  MedicalAssistanceSection,
  AchievementsSection,
  AppointmentSection,
  TestimonialSection,
  ContactSection,
  FAQSection,
  MapSection,
  FooterSection,
} from "./features/exportFeatures";

const PublicWebsite = () => {
  const [siteContent, setSiteContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "website_content", "homepage");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSiteContent(docSnap.data());
        } else {
          console.log("No such document");
        }
      } catch (e) {
        console.error("Error fetching document: ", e);
      }
    };
    fetchData();
  }, []);

  if (!siteContent)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <>
      <Navbar content={siteContent?.contact} />
      <HeroSection content={siteContent?.hero} />
      <AboutSection content={siteContent?.about} />
      <ServicesSection content={siteContent?.services} />
      <WhyUsSection content={siteContent?.why_us} />
      <MedicalAssistanceSection content={siteContent?.medicalAssistance} />
      <AchievementsSection content={siteContent?.achievment} />
      <AppointmentSection content={siteContent?.appointment} />
      <TestimonialSection content={siteContent?.testimonial} />
      <ContactSection content={siteContent?.contact} />
      <FAQSection content={siteContent?.faq} />
      <MapSection content={siteContent?.map} />
      <FooterSection content={siteContent?.footer} />

      <SeedData />
    </>
  );
};

export default PublicWebsite;
