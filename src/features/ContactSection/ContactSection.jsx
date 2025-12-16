import { Icon } from "@iconify/react";
import { memo, useRef, useState } from "react";
import useFadeInAnimation from "../../customHooks/FadeInAnimation";
import FilledButton from "../../components/filledButton";
import { HeartOutlinedIcon } from "../../assets/exportAssets";
import ContactSkeleton from "./ContactSkeleton";

const ContactSection = ({ content }) => {
  if (!content) return <ContactSkeleton />;

  const {
    address,
    dummy_email,
    email,
    heading,
    instruction,
    phone,
    sub_heading,
  } = content;

  const leftContainerRef = useRef();
  const rightContainerRef = useRef();
  const [status, setStatus] = useState("idle");

  useFadeInAnimation(leftContainerRef, {
    top: "70%",
    direction: "x",
    direction_val: -80,
  });
  useFadeInAnimation(rightContainerRef, {
    top: "70%",
    direction: "x",
    direction_val: 80,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.target);

    formData.append("_replyto", userEmail);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
        e.target.reset();
        // Reset button state after 3 seconds
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    }
  };

  return (
    <section className="py-10" id="Contact">
      <div className="grid lg:grid-cols-2 gap-7 mx-auto w-[90%] items-center">
        {/* Left Content */}
        <div
          className="relative font-[battambang] text-xl"
          ref={leftContainerRef}
        >
          <HeartOutlinedIcon
            aria-hidden="true"
            className="absolute -z-1 bottom-full right-[90%] -rotate-25 h-20 fadeInAnim"
          />
          <HeartOutlinedIcon
            aria-hidden="true"
            className="absolute -z-1 top-full right-0 rotate-25 h-20 fadeInAnim"
          />
          <h2 className="font-bold text-3xl text-[#0E5B81] fadeInAnim">
            {heading}
          </h2>
          <h3 className="text-5xl fadeInAnim">{sub_heading}</h3>
          <p className=" fadeInAnim">{instruction}</p>
          <div className="mt-10 grid gap-5">
            <p className="flex items-start fadeInAnim">
              <Icon icon="mdi:location" className="text-3xl" /> Address{" "}
              {address}
            </p>
            <p className="flex items-center fadeInAnim">
              <Icon icon="mdi-light:phone" /> Phone {phone}
            </p>
            <p className="fadeInAnim">✉️ Email {dummy_email}</p>
          </div>
        </div>

        {/* Right Form */}
        <div className="w-[80%] mx-auto lg:mx-0" ref={rightContainerRef}>
          <div className="shadow-2xl/40 relative bg-white rounded-2xl z-1 before:absolute before:w-full before:h-full before:rounded-2xl before:bg-white before:-z-5 after:absolute after:-z-10 after:w-full after:h-full after:border-4 after:border-[#48CEF3] after:inset-0 after:translate-6 after:rounded-2xl fadeInAnim after:fadeInAnim">
            <form
              onSubmit={handleSubmit}
              className="grid gap-3 rounded-2xl p-5 items-center justify-center font-[battambang] text-base"
            >
              <input
                type="hidden"
                name="_subject"
                value="New Appointment Request - Dr. Ortho"
              />
              <input
                type="hidden"
                name="_autoresponse"
                value="Thank you for contacting Dr. Nasir Hussain. We have received your appointment request."
              />
              <input type="hidden" name="_captcha" value="true" />
              <input type="hidden" name="_template" value="table" />
              <div className="grid grid-cols-2 gap-5 mx-auto">
                <label htmlFor="name" className="grid w-full gap-1">
                  Name
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    id="name"
                    required
                    className="text-sm rounded-full px-2 py-1 bg-[#5dc3df8c] inset-shadow-sm w-full"
                  />
                </label>
                <label htmlFor="phone" className="grid w-full gap-1">
                  Phone
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91..."
                    id="phone"
                    required
                    className="text-xm rounded-full px-2 py-1 bg-[#5dc3df8c] inset-shadow-sm w-full"
                  />
                </label>
              </div>

              <label htmlFor="email" className="grid mx-auto w-full gap-1">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  id="email"
                  required
                  className="text-xm rounded-full px-2 py-1 bg-[#5dc3df8c] inset-shadow-sm w-full"
                />
              </label>

              <label htmlFor="subject" className="grid mx-auto w-full gap-1">
                Subject
                <input
                  type="text"
                  name="subject"
                  placeholder="Consultation Request"
                  id="subject"
                  required
                  className="text-xm rounded-full px-2 py-1 bg-[#5dc3df8c] inset-shadow-sm w-full"
                />
              </label>

              <label htmlFor="message" className="grid mx-auto w-full gap-1">
                Message
                <textarea
                  name="message"
                  placeholder="Describe your issue..."
                  id="message"
                  rows={7}
                  required
                  className="text-xm rounded-2xl px-2 py-1 bg-[#5dc3df8c] inset-shadow-sm w-full"
                />
              </label>

              <input
                type="text"
                name="_honey"
                style={{ display: "none" }}
              ></input>
              <input type="hidden" name="_captcha" value="true" />

              <div className="w-full flex justify-center mt-2">
                <FilledButton
                  text={
                    status === "submitting"
                      ? "Sending..."
                      : status === "success"
                      ? "Message Sent! ✅"
                      : status === "error"
                      ? "Failed. Try Again ❌"
                      : "Submit Request"
                  }
                  displayArrow={status === "idle"}
                  type="submit"
                  disabled={status === "submitting"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(ContactSection);
