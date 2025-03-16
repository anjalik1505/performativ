import { useState } from 'react';
import fetchApi from '../utils/fetchApi';

interface FetchApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
}

const useFetchApi = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (url: string, options?: FetchApiOptions) => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchApi<T>(url, options);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useFetchApi;