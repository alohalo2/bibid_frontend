import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CatItDetAxios({ setResponse }) {
  const { auctionIndex } = useParams(); // URL에서 auctionIndex를 가져옴
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/category-item-detail/${auctionIndex}`)
      .then(response => {
        setResponse(response.data.item); // 상위 컴포넌트에 response를 전달
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [auctionIndex, setResponse]);

  if (loading) return <div>Loading..</div>;
  if (error) return <div>Error: {error.message}</div>;

  return null; // 데이터만 전달하고 렌더링할 내용 
}

export default CatItDetAxios;
