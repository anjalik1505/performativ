interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>; 
}

const fetchApi = async <T>(url: string, options?: ApiOptions): Promise<T> => {
  let newurl = `${import.meta.env.VITE_API_URL}${url}`;

  if (options?.params) {
    const queryParams = new URLSearchParams();

    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    newurl += `?${queryParams.toString()}`;
  }

  console.log("Final URL:", newurl); 

  const response = await fetch(newurl, {
    method: options?.method || 'GET',
    headers: {
      'x-api-key': import.meta.env.VITE_API_KEY,
      'candidate_id': import.meta.env.VITE_CANDIDATE_ID,
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export default fetchApi;