import axios, { AxiosRequestConfig } from "axios";
import { useAppStore } from "../store/app.store";

axios.defaults.baseURL = "/api/v1";

export const useAxios = () => {
  const { setLoading, setError, setErrorMessages } = useAppStore();
  const fetchData = async (
    url: string,
    method: AxiosRequestConfig["method"],
    body: object | null = null,
    headers: AxiosRequestConfig["headers"] = {},
    defaultLoader: boolean = true,
    error: boolean = true,
    withCredentials: boolean = true
  ) => {
    try {
      defaultLoader && setLoading(true);
      setErrorMessages(null);
      const config: AxiosRequestConfig = {
        method,
        url,
        headers,
        withCredentials,
      };
      if (body) {
        config.data = body;
      }
      const res = await axios(config);
      return res.data;
    } catch (err: any) {
      setLoading(false);
      setErrorMessages(err.response.data);
      if (err.response && error)
        setError(
          (err.response.data.message || "something went wrong") as string
        );
      else if (typeof err.response.data === "object")
        setErrorMessages(err.response.data);
      else if (error) setError("something went wrong");
      return false;
    } finally {
      defaultLoader && setLoading(false);
    }
  };

  return { fetchData };
};
