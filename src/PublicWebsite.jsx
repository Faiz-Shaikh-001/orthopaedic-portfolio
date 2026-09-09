import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "./firebase";

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
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);


  useEffect(() => {
    const fetchSiteContent = async () => {
      try {
        const docRef = doc(
          db,
          "website_content",
          "homepage"
        );

        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          console.error(
            "Website content document does not exist."
          );

          setLoadError(true);
          return;
        }

        setSiteContent(
          docSnap.data()
        );
      } catch (error) {
        console.error(
          "Failed to load website content:",
          error
        );

        setLoadError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSiteContent();
  }, []);


  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }


  if (loadError || !siteContent) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <h1>
          Unable to load website content
        </h1>

        <p>
          Please try again later.
        </p>
      </div>
    );
  }


  return (
    <>
      <Navbar
        content={siteContent.contact}
      />

      <HeroSection
        content={siteContent.hero}
      />

      <AboutSection
        content={siteContent.about}
      />

      <ServicesSection
        content={siteContent.services}
      />

      <WhyUsSection
        content={siteContent.why_us}
      />

      <MedicalAssistanceSection
        content={siteContent.medicalAssistance}
      />

      <AchievementsSection
        content={
          siteContent.achievement ??
          siteContent.achievment
        }
      />

      <AppointmentSection
        content={siteContent.appointment}
      />

      <TestimonialSection
        content={siteContent.testimonial}
      />

      <ContactSection
        content={siteContent.contact}
      />

      <FAQSection
        content={siteContent.faq}
      />

      <MapSection
        content={siteContent.map}
      />

      <FooterSection
        content={siteContent.footer}
      />
    </>
  );
};


export default PublicWebsite;
