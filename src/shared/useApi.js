import axios from "axios";
import { useMemo } from "react";
import { useAuth } from "../AuthProvider";
import environment from "../environment";
import { useNavigate } from "react-router-dom";

export function useApi() {
  function addUnauthorizedInterceptor(axiosObject) {
    axiosObject.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status !== 403) return;
        navigate("/login");
        return Promise.reject();
      },
    );

    return axiosObject;
  }

  function createApi() {
    const axiosObject = axios.create({
      baseURL: environment.backendUrl,
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return addUnauthorizedInterceptor(axiosObject);
  }

  const { token } = useAuth();
  const api = useMemo(createApi, [token]);
  const navigate = useNavigate();

  return api;
}
