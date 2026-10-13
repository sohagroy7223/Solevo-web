import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Card = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: products = [] } = useQuery({
    queryKey: ["card", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/cards?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(products);
  return (
    <div>
      <h2>this is card Component</h2>
    </div>
  );
};

export default Card;
