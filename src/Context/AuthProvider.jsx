import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const user = {
    name: " sohag",
    email: " sohag@gmail.com",
  };
  const userInfo = {
    user,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
