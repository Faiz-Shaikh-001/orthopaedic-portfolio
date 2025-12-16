import { memo } from "react";
import {
  BookAppointmentBottomBG,
  BookAppointmentTopBG,
  CalendarIcon,
} from "../../assets/exportAssets";
import OutlinedButton from "../../components/outlinedButton";
import AppointmentSkeleton from "./AppointmentSkeleton";

function AppointmentSection({ content }) {
  if (!content) return <AppointmentSkeleton />;
  const { heading, sub_heading } = content;
  return (
    <section className="relative w-full pb-10 lg:pb-0" id="Appointment">
      <BookAppointmentTopBG aria-hidden="true" />
      <div className="mx-auto bg-[#0F5B81] py-5 -my-1">
        <div className="w-10/12 mx-auto flex flex-col sm:flex-row items-center justify-between text-white">
          <div className="flex items-center gap-5">
            <CalendarIcon
              className="w-20 h-20 hidden lg:block"
              aria-hidden="true"
            />

            <div className="grid text-left gap-2 lg:gap-0">
              <h2 className="font-[inter] font-semibold text-4xl">{heading}</h2>
              <h4 className="font-[inter] font-semibold text-2xl">
                {sub_heading}
              </h4>
            </div>
          </div>

          <CalendarIcon
            className="w-20 h-20 absolute opacity-25 right-[5%] rotate-25 block lg:hidden"
            aria-hidden="true"
          />
          <div className="flex flex-col lg:flex-row py-5 gap-5 lg:gap-0 grow justify-center w-full lg:w-fit">
            <OutlinedButton text={"Book Appointment"} scrollToId={"#Contact"} />
            <OutlinedButton text={"View Services"} scrollToId={"#Services"} />
          </div>
        </div>
      </div>
      <BookAppointmentBottomBG aria-hidden="true" />
    </section>
  );
}

export default memo(AppointmentSection);
