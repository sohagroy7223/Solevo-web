import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import { motion, easeOut } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import { GoArrowRight } from "react-icons/go";

const Card = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: products = [], refetch } = useQuery({
    queryKey: ["card", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/cards?email=${user?.email}`);
      return res.data;
    },
  });

  const handelPayment = async (product) => {
    // console.log("payment for this product", product);
    const paymentInfo = {
      cost: product.price,
      productId: product.id,
      email: user.email,
      productName: product.name,
    };

    // console.log("Payment Info:", paymentInfo);

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.href = res.data.url;
    // console.log(res.data);
  };

  const handelDeleteCard = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        axiosSecure.delete(`/cards/${id}`).then((res) => {
          refetch();
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your products has been deleted.",
              icon: "success",
            });
          }
        });
    });
  };

  return (
    <div>
      <div className="text-center">
        <p className="text-sm font-medium">Your Card</p>
        <h3 className="text-3xl font-black">All card is here </h3>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 p-4">
        {products.length > 0 ? (
          products.map((product) => (
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
                  className="md:h-50 h-35 w-full bg-gray-600 rounded-xl object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                  src={product.image}
                  alt="Shoes"
                />
              </figure>

              <div className="p-4 flex flex-col flex-1 ">
                <h2 className="card-title">{product.name}</h2>
                <h2 className="">{product.brand}</h2>
                <h2 className="">{product.category}</h2>

                <div className="flex justify-between gap-2 items-center ">
                  <div className="md:flex justify-between items-center gap-3 w-full">
                    <div className="flex items-center gap-2">
                      <b className="text-xl">${product.price}</b>
                      <p className="line-through text-gray-600">
                        ${product.oldPrice}
                      </p>
                    </div>
                  </div>
                  <div className="border flex items-center text-sm bg-red-100 rounded-full md:p-1">
                    <p>{product.discount}</p>
                    <span className="text-sm">%OFF</span>
                  </div>
                </div>
              </div>
              <div className="w-full flex gap-2 justify-center items-center p-2">
                <button
                  onClick={() => handelDeleteCard(product._id)}
                  className="btn-sm md:btn-md btn hover:bg-red-600 hover:text-white duration-150"
                >
                  Remove card
                </button>
                <button
                  onClick={() => handelPayment(product)}
                  className="btn-sm md:btn-md btn hover:btn-primary"
                >
                  Buy Now
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <h2 className="text-xl font-semibold">Your cart is empty!</h2>
            <p className="text-gray-500">
              Please add some products to your cart.
            </p>
            <Link to="/allProducts" className="btn btn-primary">
              go to All Products <GoArrowRight size={25} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
