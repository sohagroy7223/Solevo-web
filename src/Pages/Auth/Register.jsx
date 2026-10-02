import { Link } from "react-router";

const Register = () => {
  return (
    <div>
      <div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center">Register</h1>
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input type="text" className="input" placeholder="Your Name" />
              <fieldset className="fieldset">
                <label className="label">Your Image</label>
                <input type="file" className="file-input" />
              </fieldset>
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="Email" />
              <label className="label">Password</label>
              <input type="password" className="input" placeholder="Password" />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Register Now</button>
            </fieldset>
            <p>
              Already have an account?
              <Link
                to="/login"
                className="text-blue-500 font-bold ml-1 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
