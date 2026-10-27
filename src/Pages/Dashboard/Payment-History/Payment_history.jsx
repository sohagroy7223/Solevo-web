import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";

const Payment_history = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: allHistory = [] } = useQuery({
    queryKey: ["payment-history", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments-history?email=${user.email}`,
      );
      return res.data;
    },
  });

  console.log(allHistory);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Cost</th>
            <th>Payment-status</th>
            <th>transaction Id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allHistory.map((history, index) => (
            <tr key={history._id}>
              <th>{index + 1}</th>
              <td>{history.productName}</td>
              <td>{history.amount}</td>
              <td>{history.paymentStatus}</td>
              <td>{history.transactionId}</td>
              <td>
                <button className="tooltip  btn-square" data-tip="Delete">
                  <MdDelete size={25} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payment_history;
