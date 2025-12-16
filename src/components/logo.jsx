import { NHLogoURL } from "../assets/exportAssets";

const LogoComponent = ({ height = "h-10", displayLogoText = false }) => {
  return (
    <a href="#" className="flex w-fit items-center cursor-pointer">
      <img src={NHLogoURL} alt="" className={`${height} w-fit`}/>
      <div
        className={`flex flex-col items-start justify-center ml-1 ${
          displayLogoText ? "" : "hidden"
        }`}
      >
        <h3 className="font-[battambang] text-3xl mt-2">DocnaS Clinic</h3>
        <span className="font-[allura] text-lg w-max leading-4">
          Dr. Nasir Hussain - Orthopaedic Surgeon
        </span>
      </div>
    </a>
  );
};

export default LogoComponent;
