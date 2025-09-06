import { useEffect, useState } from 'react';
import api from './api';

export default function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    api.get('/api/health').then(res => setData(res.data));
  }, []);
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}