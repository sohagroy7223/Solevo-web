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
    <div className="flex justify-center flex-col gap-2 text-center ">
      <h3 className="text-2xl font-black ">Àll Products</h3>
      <p className="text-blue-500 font-bold">Featured Collections</p>

      <div className="md:flex justify-center md:gap-5 gap-2 w-full items-center md:px-6">
        <fieldset className="fieldset max-w-md flex justify-center">
          <input type="text" className="input" placeholder="Type here" />
        </fieldset>

        {/* <div className="flex  gap-5 justify-baseline w-full"> */}
        <select defaultValue="Medium" className="select select-md">
          <option disabled={true}>Medium</option>
          <option>Medium Apple</option>
          <option>Medium Orange</option>
          <option>Medium Tomato</option>
        </select>
        <select defaultValue="Medium" className="select select-md">
          <option disabled={true}>Medium</option>
          <option>Medium Apple</option>
          <option>Medium Orange</option>
          <option>Medium Tomato</option>
        </select>
        <select defaultValue="Medium" className="select select-md">
          <option disabled={true}>Medium</option>
          <option>Medium Apple</option>
          <option>Medium Orange</option>
          <option>Medium Tomato</option>
        </select>
        {/* </div> */}
      </div>

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
                className="md:h-50 md:w-60 bg-gray-600 rounded-xl object-cover transition-transform duration-500 ease-in-out hover:scale-110"
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
                <div className="border flex items-center text-sm bg-red-300 rounded-full md:p-1">
                  <p>{product.discount}</p>
                  <span className="text-sm">%OFF</span>
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
