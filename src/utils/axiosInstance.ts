import axios from "axios";
import useAuthStore from "@/stores/authStore";

const instance = axios.create({
  baseURL: "http://localhost:8090/api",
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originRequest = err.config;

    if (err.response?.status === 401 && !originRequest._retry) {
      originRequest._retry = true;

      try {
        const res = await axios.post(
          "http://localhost:8090/api/v1/token/refresh",
          {},
          {
            withCredentials: true,
          }
        );

        const newAccessToken = res.data.accessToken;

        useAuthStore.getState().login({
          accessToken: newAccessToken,
          user: useAuthStore.getState().user!,
        });

        originRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return instance(originRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();

        window.location.href = "/signIn";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
