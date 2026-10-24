import { GrFormNextLink } from "react-icons/gr";
import { Link } from "react-router";
import image1 from "/image1.png";
import image2 from "/story.png";

const About = () => {
  return (
    <div>
      <div className="md:flex bg-[#e3d9d06d] p-5 gap-7">
        {/* content div */}
        <div className="flex flex-col md:items-start items-center space-y-2 justify-center md:w-6/12">
          <p className="text-sm font-medium">About Solevo</p>
          <h3 className="text-3xl font-black">Step Into Your Style</h3>
          <p>
            At Solevo, We believe every step tells a story. Discover footwear
            that blends modern style. Everyday comfort and Confidence{" "}
          </p>
          <Link to="/allProducts" className="btn btn-primary ">
            Explore Collection <GrFormNextLink size={25} />
          </Link>
        </div>
        {/* img div */}
        <div className="md:w-xl">
          <img className="md:w-80" src={image1} alt="" />
        </div>
      </div>
      <div className="md:flex p-5 gap-8">
        {/* img div */}
        <div className="md:w-xl">
          <img className=" rounded-2xl" src={image2} alt="" />
        </div>
        {/* content div */}
        <div className="flex flex-col md:items-start items-center space-y-2 justify-center md:w-6/12">
          <p className="text-sm font-medium">Our Story</p>
          <h3 className="text-3xl font-black">More Then Just Shoes</h3>
          <p>
            Solevo was created with on simple idea: footwear should look good
            and feel comfortable. Our collection brings together contemporary
            designs and versatile style for everyday life. <br />
            We're not just selling shoes - we're building a community of people
            who value style, comfort, and self-expression in every step they
            takes.
          </p>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm font-medium">WHY CHOOSE SOLEVO</p>
        <h3 className="text-3xl font-black">THE SOLEVO DIFFERENCE</h3>
        <div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default About;
