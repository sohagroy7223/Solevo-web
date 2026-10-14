import { useNavigate } from "react-router";

const PaymentCancel = () => {
  const navigate = useNavigate();
  const handelNavigate = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <h3 className="text-md font-bold">payment has been cancel</h3>
      <button onClick={handelNavigate} className="btn">
        Back to Home page
      </button>
    </div>
  );
};

export default PaymentCancel;
