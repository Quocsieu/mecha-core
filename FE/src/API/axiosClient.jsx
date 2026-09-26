import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api/upload",
});
export default axiosClient