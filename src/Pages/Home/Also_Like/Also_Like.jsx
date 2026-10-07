import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { FaStar } from "react-icons/fa";
import { useRef, useState } from "react";
import { motion, easeOut } from "framer-motion";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router";

const Also_Like = () => {
  const instance = useAxios();
  const [brand] = useState([]);
  const modalRef = useRef();
  const [data, setProduct] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: products = [] } = useQuery({
    queryKey: ["also-like"],
    queryFn: async () => {
      const res = await instance.get(
        `/products?limit=8&sort=${brand.createAt}`,
      );
      return res.data;
    },
  });

  const handelShowModal = (selectedProduct) => {
    setProduct(selectedProduct);
    modalRef.current.showModal();
  };

  const handelAddToCard = (productData) => {
    const productDetail = {
      brand: productData.brand,
      id: productData._id,
      name: productData.name,
      category: productData.category,
      gender: productData.gender,
      image: productData.image,
      description: productData.description,
    };
    instance.post("/cards", productDetail).then((res) => {
      if (res.data.insertedId) {
        modalRef.current.close();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "this product has been add",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="flex  justify-center flex-col gap-3 text-center items-center">
      <h3 className="text-2xl font-black ">You Might Also Like</h3>
      <p className="text-blue-500 font-bold">Featured Collections</p>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
        {products.map((product) => (
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
            className="card bg-base-100  shadow-sm"
          >
            <figure>
              <img
                className="h-50 w-60 rounded-xl object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                src={product.image}
                alt="Shoes"
              />
            </figure>
            <div className="p-4">
              <h2 className="card-title">{product.name}</h2>
              <p className="flex items-center gap-2">
                <FaStar className="text-yellow-400"></FaStar>{" "}
                <span>
                  {product.rating}({product.reviews})
                </span>
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <b className="text-xl">${product.price}</b>
                  <b className="line-through text-gray-600">
                    ${product.oldPrice}
                  </b>
                </div>
                <div>
                  <div className="border text-sm flex items-center bg-red-100 rounded-full p-1 mt-5">
                    <p>{product.discount}</p>
                    <p>% OFF</p>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => handelShowModal(product)}
              className="btn btn-primary"
            >
              view details
            </button>
          </motion.div>
        ))}
      </div>
      <dialog
        ref={modalRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className="flex text-center">
            <figure className="overflow-hidden rounded-xl relative">
              <img
                className="h-50 w-60 rounded-xl object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                src={data?.image}
                alt="Shoes"
              />
            </figure>
            <div className="p-1 bg-gray-50 space-y-1">
              <h2 className="text-sm font-bold">Name : {data?.name}</h2>
              <h2 className="text-sm font-bold">Brand : {data?.brand}</h2>
              <h2 className="text-sm font-bold">category : {data?.category}</h2>
              <p>
                color: <span>{data?.colors}</span>
              </p>
              <p className="flex items-center gap-2 ">
                <FaStar className="text-yellow-400"></FaStar>{" "}
                <span>
                  {data?.rating}({data?.reviews})
                </span>
              </p>
              <div className="flex justify-between gap-2 items-center ">
                <div className="md:flex justify-between items-center gap-3 w-full">
                  <div className="flex items-center gap-2">
                    <b className="text-xl">${data?.price}</b>
                    <p className="line-through text-gray-600">
                      ${data?.oldPrice}
                    </p>
                  </div>
                </div>
                <div className="border flex items-center text-sm bg-red-100 rounded-full md:p-1">
                  <p>{data?.discount}</p>
                  <span className="text-sm">%OFF</span>
                </div>
              </div>
              <p> stock: {data?.stock}</p>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
            <button
              onClick={() => {
                if (user) {
                  handelAddToCard(data);
                } else {
                  navigate("/login");
                }
              }}
              className="btn bg-primary text-white"
            >
              Add to Card
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Also_Like;
