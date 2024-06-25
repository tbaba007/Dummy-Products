import { useCallback, useEffect, useState } from "react";

import { appBaseUrl } from "../config";

const baseUrl = appBaseUrl;

const useApi = (path: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = (await fetch(`${baseUrl}${path}`));
      setLoading(false);
      setData(await response.json());
    } catch (exception) {
      if (exception instanceof Error) {
        setLoading(false);
        setError(exception.message);
        return exception.message;
      }
    }
  }, [path]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return {
    error,
    loading,
    data,
  };
};

export default useApi;
