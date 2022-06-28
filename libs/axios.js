import axios from "axios";

const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    console.log(`err `, error.response.status, originalRequest._retry);
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = await refreshAccessToken();
      localStorage.setItem("accessToken", accessToken);
      axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

async function refreshAccessToken() {
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.NEXT_PUBLIC_REFRESH_TOKEN_API, undefined, {
        withCredentials: true,
      })
      .then((res) => resolve(res.data.accessToken))
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export default axiosApiInstance;
