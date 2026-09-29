import image1 from "../../../assets/image1.png";
import image2 from "../../../assets/image2.png";
import image3 from "../../../assets/image3.png";
import image4 from "../../../assets/image4.png";
import image5 from "../../../assets/image5.png";
import image7 from "../../../assets/image7.png";
import image6 from "../../../assets/image6.png";
import image8 from "../../../assets/image8.png";
import { easeOut, motion } from "framer-motion";

const Recommended = () => {
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
  ];
  return (
    <motion.dev
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
      className="flex  justify-center flex-col gap-3  items-center"
    >
      <h3 className="text-2xl font-black ">
        Most Recommended Collections For You
      </h3>
      <p className="text-blue-500 font-bold">Featured Collections</p>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-2 ">
        {images.map((image) => (
          <div className="bg-base-100 shadow-sm ">
            <figure className="overflow-hidden rounded-xl">
              <img
                className="w-80 h-60 rounded-xl object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                src={image}
                alt="Shoes"
              />
            </figure>
          </div>
        ))}
      </div>
    </motion.dev>
  );
};

export default Recommended;
