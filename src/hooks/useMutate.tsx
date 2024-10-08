import { useState } from 'react';
import { HTTP_TYPES } from '@/utils/constants';
import http from '@/services/http';

interface IProps {
  url: string;
}

const useMutation = <T, E>({ url }: IProps) => {
  const [loading, setLoading] = useState(false);

  const mutate = async (body: object, method?: HTTP_TYPES, customHeaders?: object) => {
    setLoading(true);
    const headers = {
      headers: {
        // authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        ...customHeaders,
      },
    };
    try {
      const response = await http[method || HTTP_TYPES.POST](url, body, headers);
      setLoading(false);
      return {
        success: true,
        data: response?.data as T,
        errors: null,
      };
    } catch (err) {
      setLoading(false);
      return {
        success: false,
        data: null,
        errors: err as E,
      };
    }
  };

  return { loading, mutate };
};

export { useMutation };
