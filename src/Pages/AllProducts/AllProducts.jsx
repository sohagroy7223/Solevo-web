import { easeOut, motion } from "framer-motion";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";

const AllProducts = () => {
  const instance = useAxios();

  const { data: products = [] } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await instance.get(`/allProducts`);
      return res.data;
    },
  });
  return (
    <div className="flex  justify-center flex-col gap-3 text-center items-center">
      <h3 className="text-2xl font-black ">You Might Also Like</h3>
      <p className="text-blue-500 font-bold">Featured Collections</p>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
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
            className="card bg-base-100  shadow-sm"
          >
            <figure>
              <img
                className="h-50 w-60 rounded-xl object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                src={product.image}
                alt="Shoes"
              />
            </figure>
            <div className="p-4">
              <h2 className="card-title">{product.name}</h2>
              <p className="flex items-center gap-2">
                <FaStar className="text-yellow-400"></FaStar>{" "}
                <span>
                  {product.rating}({product.reviews})
                </span>
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <b className="text-xl">${product.price}</b>
                  <p className="line-through text-gray-600">
                    ${product.oldPrice}
                  </p>
                </div>
                <div>
                  <div className="border text-sm flex items-center bg-red-100 rounded-full p-1 mt-5">
                    <p>{product.discount}</p>
                    <p>% OFF</p>
                  </div>
                </div>
              </div>
            </div>
            <button className="btn btn-primary">Add to Card</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
