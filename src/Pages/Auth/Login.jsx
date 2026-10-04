import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Social_Login from "../../Components/SocialLogin/Social_Login";

const Login = () => {
  const { loginUser, resetPasswordMail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const handelLogin = (data) => {
    loginUser(data.email, data.password).then(() => {
      navigate(location?.state || "/");
    });
  };

  const handelForgetEmail = () => {
    const email = getValues("email");
    resetPasswordMail(email).then(() => {
      alert("please check your email and reset your password");
    });
  };

  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center">Login now!</h1>
          <form onSubmit={handleSubmit(handelLogin)} className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />

            {errors.email && (
              <p className="text-red-500">Email Field is Required</p>
            )}

            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="input"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500">password field is required</p>
            )}
            <div>
              <a onClick={handelForgetEmail} className="link link-hover">
                Forgot password?
              </a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </form>
          <p>
            don't have an account?
            <Link
              to="/register"
              className="text-blue-500 font-bold ml-1 hover:underline"
            >
              Register
            </Link>
          </p>
          <Social_Login></Social_Login>
        </div>
      </div>
    </div>
  );
};

export default Login;
