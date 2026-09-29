import Banner from "../Banner/Banner";
import FindStyle from "../FindYourStyle/FindStyle";
import NewProducts from "../NewProducts/NewProducts";
import Recommended from "../Recommended/Recommended";

const Home = () => {
  return (
    <div className="space-y-10">
      <Banner></Banner>
      <NewProducts></NewProducts>
      <Recommended></Recommended>
      <FindStyle></FindStyle>
    </div>
  );
};

export default Home;
