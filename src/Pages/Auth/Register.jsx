import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link, useLocation, useNavigate } from "react-router";
import Social_Login from "../../Components/SocialLogin/Social_Login";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, verifyEmail } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handelRegister = async (data) => {
    try {
      //   console.log("Form Data:", data);

      // image
      const profileImage = data.image[0];

      // 1. Create Firebase user
      createUser(data.email, data.password);

      // 2. Create FormData
      const formData = new FormData();
      formData.append("image", profileImage);

      // 3. ImgBB URL
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;

      // 4. Upload image
      const imageResponse = await axios.post(image_API_URL, formData);

      const image = imageResponse.data.data.url;

      // 5. User information
      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL: image,
      };

      // 6. Save user to MongoDB
      axiosSecure.post("/users", userInfo).then((res) => {
        verifyEmail().then(() => {
          alert("please verified your email");
        });
        navigate(location?.state || "/");
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "your register has been success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });

      // console.log("MongoDB Response:", response.data);
    } catch (error) {
      console.log("Registration Error:", error);
    }
  };

  return (
    <div className="p-3 rounded-2xl shadow-2xl shadow-gray-500 bg-white">
      <h3 className="md:text-3xl text-2xl font-bold text-center mb-3">
        Sign up Now
      </h3>

      <form onSubmit={handleSubmit(handelRegister)}>
        <fieldset className="fieldset">
          {/* Name */}
          <label className="label">Name</label>

          <input
            type="text"
            {...register("name", {
              required: true,
            })}
            className="input"
            placeholder="Your name"
          />

          {errors.name && (
            <p className="text-red-500">Name Field is Required</p>
          )}

          {/* Image */}
          <label className="label">Image</label>

          <input
            type="file"
            accept="image/*"
            {...register("image", {
              required: true,
            })}
            className="file-input"
          />

          {errors.image && (
            <p className="text-red-500">Image Field is Required</p>
          )}

          {/* Email */}
          <label className="label">Email</label>

          <input
            type="email"
            {...register("email", {
              required: true,
            })}
            className="input"
            placeholder="Email"
          />

          {errors.email && (
            <p className="text-red-500">Email Field is Required</p>
          )}

          {/* Password */}
          <label className="label">Password</label>

          <input
            type="password"
            {...register("password", {
              required: true,
              validate: {
                uppercase: (value) =>
                  /[A-Z]/.test(value) || "Add an uppercase letter",

                lowercase: (value) =>
                  /[a-z]/.test(value) || "Add a lowercase letter",

                number: (value) => /\d/.test(value) || "Add a number",

                special: (value) =>
                  /[@$!%*?&]/.test(value) || "Add a special character",

                length: (value) =>
                  value.length >= 6 || "Password must be at least 6 characters",
              },
            })}
            className="input"
            autoComplete="new-password"
            placeholder="Password"
          />

          {errors.password && (
            <p className="text-red-500">
              {errors.password.message || "Password Field is Required"}
            </p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="btn bg-primary text-white font-bold mt-4"
          >
            Sign Up
          </button>
        </fieldset>

        <p>
          Already have an account?{" "}
          <Link className="text-blue-600 font-bold hover:underline" to="/login">
            Login
          </Link>
        </p>
      </form>

      <Social_Login />
    </div>
  );
};

export default Register;
