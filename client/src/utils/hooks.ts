import axios from "axios";
import { useEffect, useState } from "react";

type Method = "get" | "post" | "put" | "delete";

export const useFetch = (url: string, method: Method, body?: object) => {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await axios({ method: method, url: url, data: body })
        .then((res) => setApiData(res.data))
        .catch((err) => {
          setError(true);
        });
      setLoading(false);
    };
    fetchData();
  }, [url, method, body]);

  return { loading, apiData, error };
};
