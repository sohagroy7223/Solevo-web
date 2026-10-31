import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
// import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "https://solevo-web-server-1.onrender.com",
});
const useAxiosSecure = () => {
  const { user } = useAuth();
  useEffect(() => {
    // request interceptor
    const resInterceptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      return config;
    });

    return () => {
      axiosSecure.interceptors.request.eject(resInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
