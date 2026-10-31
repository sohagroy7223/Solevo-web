import axios from "axios";

const instance = axios.create({
  baseURL: "https://solevo-web-server-1.onrender.com",
});
const useAxios = () => {
  return instance;
};

export default useAxios;
