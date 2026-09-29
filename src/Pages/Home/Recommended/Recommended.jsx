import image1 from "../../../assets/image1.png";
import image2 from "../../../assets/image2.png";
import image3 from "../../../assets/image3.png";
import image4 from "../../../assets/image4.png";
import image5 from "../../../assets/image5.png";
import image7 from "../../../assets/image7.png";
import image6 from "../../../assets/image6.png";
import image8 from "../../../assets/image8.png";
import image9 from "../../../assets/image9.png";
import image10 from "../../../assets/image10.png";
import image12 from "../../../assets/image12.png";
import image11 from "../../../assets/image11.png";

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
    image9,
    image10,
    image11,
    image12,
  ];
  return (
    <div className="flex  justify-center flex-col gap-3  items-center">
      <h3 className="text-2xl font-black ">
        Most Recommended Collections For You
      </h3>
      <p className="text-blue-500 font-bold">Featured Collections</p>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-2 ">
        {images.map((image) => (
          <div className="bg-base-100 shadow-sm ">
            <figure>
              <img className="w-80 h-60 rounded-xl" src={image} alt="Shoes" />
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommended;
