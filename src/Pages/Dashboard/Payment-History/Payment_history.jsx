import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { VscRepoFetch } from "react-icons/vsc";

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

  const handelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/payment/${id}`).then((res) => {
          VscRepoFetch();
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

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
              <td className="font-bold">${history.amount}</td>
              <td>{history.paymentStatus}</td>
              <td>{history.transactionId}</td>
              <td>
                <button
                  onClick={() => handelDelete(history._id)}
                  className="tooltip  btn-square"
                  data-tip="Delete"
                >
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
