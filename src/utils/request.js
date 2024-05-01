import axios from "axios";

const request = axios.create({
  baseURL: "https://api.agerlink.it/api/v1",

  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      const error = {
        error: "No response from the server, please try again later",
      };
      const data = { response: { data: error } };
      return Promise.reject(data);
    }
    return Promise.reject(error);
  }
);

export default request;
