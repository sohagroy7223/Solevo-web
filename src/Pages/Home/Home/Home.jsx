import Banner from "../Banner/Banner";
import FindStyle from "../FindYourStyle/FindStyle";
import NewProducts from "../NewProducts/NewProducts";

const Home = () => {
  return (
    <div className="space-y-10">
      <Banner></Banner>
      <NewProducts></NewProducts>
      <FindStyle></FindStyle>
    </div>
  );
};

export default Home;
