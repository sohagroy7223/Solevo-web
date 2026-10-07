import { easeOut, motion } from "framer-motion";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

const AllProducts = () => {
  const instance = useAxios();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [gender, setGender] = useState("");
  const modalRef = useRef();
  const [data, setProduct] = useState(null);

  const { data: products = [] } = useQuery({
    queryKey: ["allProducts", search, category, brand, gender],
    queryFn: async () => {
      const res = await instance.get(
        `/allProducts?search=${search}&category=${category}&brand=${brand}&gender=${gender}`,
      );

      return res.data;
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories", brand, gender],
    queryFn: async () => {
      const res = await instance.get(
        `/filter-options?type=category&brand=${brand}&gender=${gender}`,
      );

      return res.data;
    },
  });

  const { data: brands = [] } = useQuery({
    queryKey: ["brands", category, gender],
    queryFn: async () => {
      const res = await instance.get(
        `/filter-options?type=brand&category=${category}&gender=${gender}`,
      );

      return res.data;
    },
  });

  const { data: genders = [] } = useQuery({
    queryKey: ["genders", category, brand],
    queryFn: async () => {
      const res = await instance.get(
        `/filter-options?type=gender&category=${category}&brand=${brand}`,
      );

      return res.data;
    },
  });

  const handelSearchProducts = (e) => {
    setSearch(e.target.value);
  };

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

  // console.log(data);

  return (
    <div className="flex justify-center flex-col gap-2 text-center ">
      <h3 className="text-2xl font-black ">Àll Products</h3>
      <p className="text-blue-500 font-bold">Featured Collections</p>

      <fieldset className="fieldset max-w-md flex justify-center mx-auto w-full">
        <input
          type="text"
          className="input"
          onChange={handelSearchProducts}
          placeholder="Search the products here"
        />
      </fieldset>

      <div className="md:flex justify-center md:gap-5 gap-2 w-full items-center md:px-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-md"
        >
          <option value="">Select Category</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="select select-md"
        >
          <option value="">Select Brand</option>

          {brands.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="select select-md"
        >
          <option value="">Select Gender</option>

          {genders.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 p-4">
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
              <p className="flex items-center gap-2">
                <FaStar className="text-yellow-400"></FaStar>{" "}
                <span>
                  {product.rating}({product.reviews})
                </span>
              </p>
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
            <button
              onClick={() => handelShowModal(product)}
              className="btn btn-primary"
            >
              view Details
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
              onClick={() => handelAddToCard(data)}
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

export default AllProducts;
