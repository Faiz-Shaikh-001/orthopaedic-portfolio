import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase"; // Adjust path if needed

const MASTER_DATA = {
  hero: {
    title: "Dr. Nasir Hussain",
    subtext:
      "Orthopaedic Surgeon • Joint Replacement • Trauma & Sports Injuries.<br/> Fellowship-trained with decades of experience delivering excellent surgical outcomes.",
    stats: { exp: 25, patients: 12400, surgeries: 4200 },
  },

  // --- 2. ABOUT SECTION ---
  about: {
    name: "Dr. Nasir Hussain",
    designation: "Orthopaedic Surgeon • Fellowship (Fortis Gurgaon)",
    heading: "About Dr. Hussain",
    imageUrl: "", // Leave empty for now, or put a test URL
    bio: "With extensive experience across leading hospitals like <strong>AIIMS, New Delhi</strong>, <strong>Medanta</strong>, and <strong>Apollo Spectra</strong>, Dr. Nasir Hussain is a trusted name in orthopaedics.<br/><br/>His expertise covers advanced trauma care, complex joint replacements, and minimally invasive procedures. Dr. Hussain is committed to providing compassionate care with evidence-based treatments that deliver lasting results.",
  },

  // --- 3. SERVICES SECTION ---
  services: {
    heading: "Our Services",
    services_list: [
      {
        title: "Joint Replacement",
        description:
          "Hip, knee & shoulder replacements with minimally invasive approaches.",
        icon_key: "knee",
      },
      {
        title: "Trauma & Fracture Care",
        description: "Acute fracture fixation, polytrauma & rehabilitation.",
        icon_key: "fracture",
      },
      {
        title: "Sports Injuries",
        description: "ACL, meniscal repairs and athlete-specific rehab.",
        icon_key: "running",
      },
      {
        title: "Arthroscopy",
        description:
          "Minimally invasive surgery to diagnose and treat joint problems.",
        icon_key: "scope",
      },
      {
        title: "Pediatric Orthopaedics",
        description: "Growth plate care & congenital conditions.",
        icon_key: "hip",
      },
      {
        title: "Second Opinion",
        description: "Detailed case review and scan interpretation.",
        icon_key: "report",
      },
    ],
  },

  // --- 4. WHY US SECTION ---
  why_us: {
    heading: "Why Choose Us",
    sub_heading: "What Makes Us the Right Choice for You",
    intro_text:
      "We provide expert healthcare with a focus on compassion, trust and personalized attention.",
    bullets: [
      "Experienced and Caring Team",
      "Personalized Care for Every Patient",
      "Dedicated to Service at All Stages",
    ],
    benefits_list: [
      {
        title: "Personalized Attention",
        description:
          "You are not just another case file. We believe the most effective treatment plan is one designed specifically for you.",
        icon_key: "smile",
      },
      {
        title: "Compassionate Approach",
        description:
          "We know that living with pain can be physically and emotionally draining. Our team provides a supportive environment.",
        icon_key: "support",
      },
      {
        title: "Trusted by Patients",
        description:
          "Our greatest achievement is the trust we've built within the Thane community.",
        icon_key: "handshake",
      },
      {
        title: "Ethical Practice",
        description:
          "We pride ourselves on transparent pricing and necessary-only interventions.",
        icon_key: "heart",
      },
    ],
  },

  // --- 5. MEDICAL ASSISTANCE SECTION ---
  medicalAssistance: {
    heading: "Our Medical Assistance",
    cards: [
      {
        title: "Assured Outcomes",
        content:
          "Our highly skilled orthopaedic team ensures you receive the most effective treatment for fractures, joint issues, and musculoskeletal conditions. We focus on delivering predictable, long-lasting surgical and non-surgical outcomes.",
        icon_name: "healthicons:doctor-male-outline",
        variant: "default",
        cta_text: "View Results",
      },
      {
        title: "Skilled Surgeon",
        content:
          "With advanced training from leading institutes, Dr. Nasir Hussain brings years of specialized experience in joint replacement, trauma care, and sports injuries—ensuring expert, evidence-based treatment.",
        icon_name: "material-symbols-light:ecg-heart-outline-sharp",
        variant: "dark",
        cta_text: "See Our Surgeon",
      },
      {
        title: "Make an Appointment",
        content:
          "We are honoured to be entrusted with your care. Schedule your consultation and take the first step toward a pain-free, active life.",
        icon_name: "hugeicons:appointment-01",
        variant: "accent",
        cta_text: "Book Appointment",
      },
      {
        title: "Latest Techniques",
        content:
          "We use the latest arthroscopy techniques, minimally invasive procedures, and modern orthopaedic implants to provide faster recovery and superior outcomes.",
        icon_name: "healthicons:virus-research-alt-outline",
        variant: "default",
        cta_text: "Explore Services",
      },
      {
        title: "Scientific Distinction",
        content:
          "We stay updated with the newest research in orthopaedics, regularly engaging in scientific learning to bring world-class treatment techniques to our patients.",
        icon_name: "la:medal",
        variant: "dark",
        cta_text: "Scientific Excellence",
      },
      {
        title: "Patient Satisfaction",
        content:
          "Your recovery and comfort are our top priority. We take pride in consistent, high patient satisfaction—reflecting our commitment to compassionate, quality care.",
        icon_name: "fa-solid:people-arrows",
        variant: "accent",
        cta_text: "Call Us",
      },
    ],
  },
  achievement: {
    heading: "Our Achivements",
    sub_text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam maximus nulla ut justo porttitor luctus. Vivamus nulla elit, dapibus et sodales eget, euismod at justo. Nunc in lorem tempus, sagittis metus ut, varius erat. Sed venenatis magna eget laoreet consequat. Quisque dictum quam eget arcu laoreet, in accumsan erat tincidunt. Proin tincidunt urna sed mi volutpat bibendum. Phasellus sit amet  ultricies sapien. Praesent tincidunt fringilla ipsum,",
    cards: [
      {
        icon_name: "healthicons:doctor-male",
        title: "Conditions Treated",
        content:
          "Elbow Sports Injuries Ligamentous instability Dislocations Tendinopathies Elbow Arthritis Compressive Neuropathies Bone and Joint Infections Tubercular Infection Septic Arthritis Osteomyelitis Musculo Skeletal Tumors Benign Malignant…",
        variant: "default",
      },
      {
        icon_name: "healthicons:doctor-male",
        title: "Patient Information : Exercises",
        content:
          "Exercises form an integral part of any Orthopaedic treatment strategy. Your Orthopaedic Surgeon in collaboration with a Physical Therapist would advise you the best combination…",
        variant: "dark",
      },
      {
        icon_name: "healthicons:doctor-male",
        title: "Patient Information: Ergonomics",
        content:
          "Know what is Ergonomics and its importance. Also find practical tips for optimising your workstation and daily life ergonomically to help sort out common body…",
        variant: "accent",
      },
      {
        icon_name: "healthicons:doctor-male",
        title: "Social Work",
        content:
          "Participated in free Orthopaedics surgical camp held at Shri Anandpur Trust charitable hospital located at P.O. Shri Anandpur near Eagar, District Ashok Nagar, Madhya Pradesh…",
        variant: "default",
      },
      {
        icon_name: "healthicons:doctor-male",
        title: "Tele Medicine and Video Consultations",
        content:
          "We offer patients the ability to have a virtual consultation with Dr. Kunal Aneja, also known as telemedicine, through which many musculoskeletal conditions can be…",
        variant: "dark",
      },
      {
        icon_name: "healthicons:doctor-male",
        title: "Orthopaedic Second Opinion",
        content:
          "It is very common for patients suffering from an orthopaedic condition, who want to make sure that they are making the best decision to maintain their active lifestyles, to…",
        variant: "accent",
      },
      {
        icon_name: "healthicons:doctor-male",
        title: "Lectures Delivered",
        content:
          "Addressed the press conference held at Sancheti Hospital on occasion of Bone and Joint week (12th-20th October) 2014 and delivered a presentation to commemorate World…",
        variant: "default",
      },
      {
        icon_name: "healthicons:doctor-male",
        title: "Awards, Honours & Recognitions",
        content:
          "Asia Pacific Arthroplasty Society Annual International Fellowship Award, Thailand Delhi Orthopaedic Association (D.O.A.) travelling fellowship award, AIIMS, New Delhi Young Research Investigator Award, Pune, Maharashtra…",
        variant: "dark",
      },
      {
        icon_name: "healthicons:doctor-male",
        title: "Treatments Offered",
        content:
          "Best Treatment and Surgeries Offered Dr. Kunal Aneja is known for providing the latest and most advanced treatment strategies including surgeries to ensure faster pain…",
        variant: "accent",
      },
    ],
  },
  appointment: {
    heading: "Open For Appointments",
    sub_heading: "Don't Let Pain Dictate Your Life. We Can Help.",
  },
  testimonial: {
    heading: "Testimonials",
    testimonials: [
      {
        name: "Jane Doe",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "https://i.pravatar.cc/150?img=32",
      },
      {
        name: "John Smith",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "https://i.pravatar.cc/150?img=12",
      },
      {
        name: "Sarah Connors",
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        image: "https://i.pravatar.cc/150?img=5",
      },
    ],
  },
  contact: {
    email: "shaikhaslamali786@gmail.com",
    heading: "Get In Touch",
    sub_heading: "Your Path to Pain-Free Movement Starts Here.",
    instruction:
      "Fill out the form to request an appointment or ask a question, and our team will get back to you shortly to confirm.",
    address:
      "Shop No. 1, Wellness Avenue, near City Hospital, Thane West, Thane, Maharashtra 400601",
    phone: "+91 91234 56789",
    dummy_email: "contact@drorthocare.com",
  },
  faq: {
    heading: "Help & FAQs",
    sub_heading: "Frequently Asked Questions",
    faqs: [
      {
        question: "What are business hours?",
        answer:
          "Our practice hours are from 9:00am to 9:00pm, Monday through Saturday at various practice locations. For booking an appointment telephonically, kindly contact on +91-91234-56789 ",
      },
      {
        question: "How do I book an appointment?",
        answer:
          "You can book an appointment by calling our reception desk, using the online booking form on our website, or visiting any of our clinic locations directly.",
      },
      {
        question: "Do you accept insurance?",
        answer:
          "Yes, we accept major insurance providers. Please contact our support team with your policy details to verify coverage before your visit.",
      },
      {
        question: "What should I bring to my first visit?",
        answer:
          "Please bring a valid ID, your insurance card, any previous medical records or X-rays related to your condition, and a list of current medications.",
      },
      {
        question: "Are emergency services available?",
        answer:
          "We handle urgent orthopaedic cases during business hours. For life-threatening emergencies or severe trauma outside hours, please visit the nearest hospital ER.",
      },
      {
        question: "Do you offer physical therapy?",
        answer:
          "Yes, we have in-house physical therapists who work closely with our surgeons to create personalized rehabilitation plans for recovery.",
      },
      {
        question: "How long is the recovery after surgery?",
        answer:
          "Recovery time varies significantly by procedure. Minor arthroscopy might take weeks, while joint replacement can take months. Your doctor will provide a specific timeline.",
      },
      {
        question: "Can I get a second opinion?",
        answer:
          "Absolutely. We encourage patients to feel confident in their treatment plan. Our specialists are happy to review your case and provide an expert second opinion.",
      },
    ],
  },
  map: {
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.930812459392!2d72.82354437457906!3d19.066779352263133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c90ee61a46d9%3A0x632e25778a624051!2sRizvi%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1764350825003!5m2!1sen!2sin",
  },
  footer: {
    description:
      "Consultant, Orthopaedic Surgeon, Joint Replacement, Preservation, Sports, Medicine & Complex Trauma Specialist",
    contact: {
      address:
        "Shop No. 1, Wellness Avenue, near City Hospital, Thane West, Thane, Maharashtra 400601",
      phone: "+91 91234 56789",
      email: "contact@drorthocare.com",
      timing: "Mon & Sat: 10am - 9pm",
    },
    social_links: [
      { icon: "facebook", link: "#" },
      { icon: "instagram", link: "#" },
      { icon: "linkedIn", link: "#" },
      { icon: "youtube", link: "#" },
    ],
    quick_links: [
      { href: "#Home", text: "Home" },
      { href: "#About", text: "About Us" },
      { href: "#Services", text: "Our Services" },
      { href: "#WhyUs", text: "Why Us" },
      { href: "#MedicalAssistance", text: "Assistance" },
      { href: "#MedicalAchievements", text: "Achievements" },
      { href: "#Testimonials", text: "Testimonials" },
      { href: "#Appointment", text: "Appointment" },
      { href: "#Contact", text: "Contact Us" },
      { href: "#FAQs", text: "FAQs" },
    ],
  },
};

const SeedData = () => {
  const handleUpload = async () => {
    try {
      // Writes to Collection: website_content, Document: homepage
      await setDoc(doc(db, "website_content", "homepage"), MASTER_DATA);
      alert("✅ Data Uploaded Successfully! You can delete this button now.");
      window.location.reload(); // Reload to see changes
    } catch (error) {
      console.error("Error writing document: ", error);
      alert("❌ Error uploading data. Check console.");
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-50">
      <button
        onClick={handleUpload}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full shadow-2xl text-xl animate-bounce"
      >
        🚀 CLICK TO UPLOAD DATA
      </button>
    </div>
  );
};

export default SeedData;
