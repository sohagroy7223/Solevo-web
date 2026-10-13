import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaStar } from "react-icons/fa";
import { motion, easeOut } from "framer-motion";

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
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 p-4">
      {products.map((product) => (
        <motion.div
          initial={{
            opacity: 0,
            y: 80,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            ease: easeOut,
          }}
          key={product._id}
          className="card bg-base-100 shadow-sm"
        >
          <figure>
            <img
              className="md:h-50 h-35 w-full bg-gray-600 rounded-xl object-cover transition-transform duration-500 ease-in-out hover:scale-110"
              src={product.image}
              alt="Shoes"
            />
          </figure>

          <div className="p-4 flex flex-col flex-1 ">
            <h2 className="card-title">{product.name}</h2>
            <p className="flex items-center gap-2">
              <FaStar className="text-yellow-400"></FaStar>{" "}
              <span>
                {product.rating}({product.reviews})
              </span>
            </p>
            <div className="flex justify-between gap-2 items-center ">
              <div className="md:flex justify-between items-center gap-3 w-full">
                <div className="flex items-center gap-2">
                  <b className="text-xl">${product.price}</b>
                  <p className="line-through text-gray-600">
                    ${product.oldPrice}
                  </p>
                </div>
              </div>
              <div className="border flex items-center text-sm bg-red-100 rounded-full md:p-1">
                <p>{product.discount}</p>
                <span className="text-sm">%OFF</span>
              </div>
            </div>
          </div>
          <div className="w-full flex gap-2 justify-center items-center p-2">
            <button className="btn hover:bg-red-600 hover:text-white duration-150">
              Remove card
            </button>
            <button className="btn hover:btn-primary">Buy Now</button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Card;
