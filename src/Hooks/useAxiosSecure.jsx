import axios from "axios";
// import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000/",
});
const useAxiosSecure = () => {
  //   useEffect(() => {
  //     // request interceptor
  //     const resInterceptor = axiosSecure.interceptors.request.use((config) => {
  //       return config;
  //     });

  //     return () => {
  //       axiosSecure.interceptors.request.eject(resInterceptor);
  //     };
  //   }, []);

  return axiosSecure;
};

export default useAxiosSecure;
