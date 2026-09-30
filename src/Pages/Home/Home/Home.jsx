import Also_Like from "../Also_Like/Also_Like";
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
      <Also_Like></Also_Like>
    </div>
  );
};

export default Home;
