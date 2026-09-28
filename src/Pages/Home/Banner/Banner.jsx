import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../../assets/banner1.png";
import banner2 from "../../../assets/banner2.png";
import banner3 from "../../../assets/banner3.png";

const Banner = () => {
  return (
    <div>
      <Carousel autoPlay={true} infiniteLoop={true} interval={2000}>
        <div className="relative">
          <img className="rounded-xl" src={banner1} />
          <div className="w-6/12 top-57 left-21 absolute z-10 translate-y-1/2">
            <div className="flex gap-3">
              <button className="btn bg-primary text-white border-0 rounded-2xl w-34">
                Shop Now
              </button>
            </div>
          </div>
        </div>
        <div className="relative">
          <img className="rounded-xl" src={banner2} />
          <div className="w-6/12 top-56 left-17 absolute z-10 translate-y-1/2">
            <div className="flex gap-3">
              <button className="btn bg-primary text-white border-0 rounded-2xl w-34">
                Shop Now
              </button>
            </div>
          </div>
        </div>
        <div className="relative">
          <img className="rounded-xl" src={banner3} />
          <div className="w-6/12 top-56 left-17 absolute z-10 translate-y-1/2">
            <div className="flex gap-3">
              <button className="btn bg-primary text-white border-0 rounded-2xl w-35">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
