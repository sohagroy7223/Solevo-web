import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

const FindStyle = () => {
  const instance = useAxios();

  const { data: products = [] } = useQuery({
    queryKey: ["isPopular"],
    queryFn: async () => {
      const res = await instance.get("/products?type=popular");
      return res.data;
    },
  });
  console.log(products);
  return (
    <div>
      <p className="text-blue-500 font-bold">shope by category</p>
      <h3 className="text-2xl font-black">Find Your Style</h3>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: "20%",
          depth: 100,
          modifier: 1,
          scale: 0.5,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Autoplay, Pagination]}
        className="mySwiper"
      >
        <div className="grid grid-cols-5 mt-5">
          {products.map((product) => (
            <div className="card bg-base-100 w-50 h-50 shadow-sm">
              <SwiperSlide key={product._id}>
                <img
                  className="h-75 rounded-2xl w-80 bg-cover"
                  src={product.image}
                  alt=""
                />
                <div className="card-body">
                  <h2 className="card-title">{product.category}</h2>
                  <p>available-{product.stock}</p>
                </div>
              </SwiperSlide>
            </div>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default FindStyle;
