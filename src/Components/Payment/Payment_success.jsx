import { section } from "framer-motion/client";
import { useSearchParams } from "react-router";
import success from "/success.png";

const Payment_success = () => {
  const [searchParams] = useSearchParams();
  const sectionId = searchParams.get("session_id");
  console.log(section);
  return (
    <div className="flex flex-col justify-center items-center ">
      <h2> payment has been success </h2>
      <p>
        section Id : <span className="text-md font-bold">{sectionId}</span>
      </p>
      <img src={success} alt="" />
    </div>
  );
};

export default Payment_success;
