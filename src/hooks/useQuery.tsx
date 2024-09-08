import { useEffect, useState } from 'react';
import { ACCESS_TOKEN } from '@/utils/constants';
import http from '@/services/http';

interface IProps {
  url: string;
  notFetchOnLoad?: boolean;
  customHeaders?: object;
}

const useQuery = <T,>({ url, notFetchOnLoad, customHeaders = {} }: IProps) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    if (!notFetchOnLoad) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const fetchData = async () => {
    setLoading(true);
    setData(null);
    setError(null);
    const headers = {
      headers: {
        authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        ...customHeaders,
      },
    };
    try {
      const response = await http.get(url, headers);
      setLoading(false);
      setData(response?.data);
      return {
        success: true,
        data: response?.data,
        errors: null,
      };
    } catch (err) {
      setLoading(false);
      setError(err);
      return {
        success: false,
        data: null,
        errors: err,
      };
    }
  };

  return { error, loading, data, retry: fetchData };
};

export { useQuery };
