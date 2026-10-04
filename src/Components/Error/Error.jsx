import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router";
import image from "/shoeError.png";

const Error = () => {
  const navigate = useNavigate();
  const handelNavigate = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen space-y-3 relative">
        <div
          onClick={handelNavigate}
          className="flex items-center gap-2 cursor-pointer bg-primary p-2 rounded-2xl"
        >
          <IoArrowBack className="text-white" size={25} />
          <h3 className=" font-bold text-white">Back to Home</h3>
        </div>
        <img className="rounded-2xl" src={image} alt="" />
        <h3 className="text-3xl font-bold text-white absolute mt-85">
          This Page Not Found
        </h3>
      </div>
    </div>
  );
};

export default Error;
