import React, { useEffect, useState, useCallback } from 'react';
import '../css/Category.css';
import Conveyor from '../components/Category/Conveyor';
import { useNavigate } from 'react-router-dom';
import CategoryMenu from '../components/Category/CategoryMenu';
import ProductLine from '../components/Category/ProductLine';
import axios from 'axios';

const DetailedCategory = () => {
  const navi = useNavigate();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 5; // 한 페이지에 표시할 아이템 수
  const [hasMore, setHasMore] = useState(true); // 추가 데이터 여부

  const fetchBestProducts = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/auction/best/취미, 수집');
      if (response.status === 200) {
        const data = response.data.pageItems.content || [];
        setProducts(prevProducts => [...prevProducts, ...data]);
        setHasMore(data.length === itemsPerPage); // 다음 페이지가 있는지 확인
      } else {
        console.error('상품 가져오기 실패');
        setHasMore(false);
      }
    } catch (error) {
      console.error('베스트 상품을 가져오는 중 오류 발생:', error);
    }
  }, []);

  useEffect(() => {
    fetchBestProducts();
  }, [fetchBestProducts, page]); // 컴포넌트 마운트 또는 페이지 변경 시 호출

  const loadMore = useCallback(() => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }, [hasMore]);

  const toCategory = () => navi('/categories', { replace: true });
  const toAll = () => navi('/categories/all', { replace: true });
  const toClothing = () => navi('/categories/clothing', { replace: true });
  const toHob = () => navi('/categories/hob', { replace: true });
  const toBook = () => navi('/categories/book', { replace: true });
  const toArt = () => navi('/categories/art', { replace: true });
  const toElec = () => navi('/categories/elec', { replace: true });
  const toPic = () => navi('/categories/pic', { replace: true });
  const toAntique = () => navi('/categories/antique', { replace: true });

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
        loadMore(); // 스크롤이 바닥에 가까워지면 다음 페이지 로드
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loadMore]);

  return (
    <div className='CTG_category'>
      <div className='blank' />
      <div className='CTG_container'>
        <CategoryMenu />
      </div>
      <div className='blank'/>
      <Conveyor />
      <div className='blank'/>
      {products.length > 0 ? (
        <ProductLine products={products} />
      ) : (
        <p>상품이 없습니다.</p>
      )}
    </div>
  );
};

export default DetailedCategory;