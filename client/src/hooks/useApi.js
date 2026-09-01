import { useState, useEffect } from 'react';
import api from '../api/axiosInstance';

function useApi(endpoint, fallback = null) {
  const [data, setData]       = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api.get(endpoint)
      .then((res) => { if (!cancelled) { setData(res.data); setLoading(false); } })
      .catch(()  => { if (!cancelled) { setLoading(false); } });
    return () => { cancelled = true; };
  }, [endpoint]);

  return { data, loading };
}

export default useApi;