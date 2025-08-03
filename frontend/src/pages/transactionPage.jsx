import { useEffect, useState } from 'react';
import axios from 'axios';

function transactionPage() {
  const [trans, setTrans] = useState([])

  useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/transactions`)
      .then(res => setTrans(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Test</h2>
      <ul>
        {trans.map((b, i) => (
          <li key={i}>{b.test}</li>
        ))}
      </ul>
    </div>
  );
}

export default transactionPage;