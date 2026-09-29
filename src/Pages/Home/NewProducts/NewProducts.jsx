import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { Swiper, SwiperSlide } from "swiper/react";
import { easeOut, motion } from "framer-motion";
import { FreeMode, Pagination } from "swiper/modules";

const NewProducts = () => {
  const instance = useAxios();

  const { data: newProducts = [] } = useQuery({
    queryKey: ["newProducts"],
    queryFn: async () => {
      const res = await instance.get("/products?type=new");
      return res.data;
    },
  });

  return (
    <div>
      <p className="text-blue-500 font-bold">Featured Collections</p>
      <h3 className="text-2xl font-black">Newly Dropped Collection</h3>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <div className="flex">
          {newProducts.map((product) => (
            <SwiperSlide>
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
                className="card bg-base-100 shadow-sm mt-5 hover:shadow-lg shadow-blue-500 "
              >
                <figure>
                  <img
                    className="h-50 rounded-2xl w-60 bg-cover py-3"
                    src={product.image}
                    alt="Shoes"
                  />
                </figure>
                <div className="p-4">
                  <h2 className="card-title">{product.name}</h2>
                  {product.colors.map((color, index) => (
                    <p key={index}>{color}</p>
                  ))}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <b className="text-xl">${product.price}</b>
                      <p className="line-through text-gray-600">
                        ${product.oldPrice}
                      </p>
                    </div>
                    <div>
                      <p className="border text-sm flex items-center bg-red-100 rounded-full p-1 mt-5">
                        {product.discount}
                        <span>% OFF</span>
                      </p>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary">Add to Card</button>
              </motion.div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default NewProducts;
