import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

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

  //   console.log(allHistory);
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>transaction Id</th>
          </tr>
        </thead>
        <tbody>
          {allHistory.map((history, index) => (
            <tr key={history._id}>
              <th>{index + 1}</th>
              <td>{history.productName}</td>
              <td className="font-bold">${history.amount}</td>
              <td>{new Date(history.paidAt).toLocaleString("en-BD")}</td>
              <td>{history.transactionId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payment_history;
