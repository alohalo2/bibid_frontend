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
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 5; // 한 줄에 5개 상품
  const [hasMore, setHasMore] = useState(true); // 추가 데이터 여부

  const fetchProducts = async () => {
    if (!hasMore) return; // 더 이상 데이터가 없으면 호출하지 않음

    try {
      const response = await axios.get(`/api/auctions?page=${page}&size=${itemsPerPage}`);
      const newProducts = response.data;

      setProducts(prevProducts => [...prevProducts, ...newProducts]);
      
      // 데이터가 더 이상 없으면 hasMore를 false로 설정
      if (newProducts.length < itemsPerPage) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]); // page가 변경될 때마다 fetchProducts 호출

  const loadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const toCategory = () => navi('/categories', { replace: true });
  const toAll = () => navi('/categories/all', { replace: true });
  const toClothing = () => navi('/categories/clothing', { replace: true });
  const toHob = () => navi('/categories/hob', { replace: true });
  const toBook = () => navi('/categories/book', { replace: true });
  const toArt = () => navi('/categories/art', { replace: true });
  const toElec = () => navi('/categories/elec', { replace: true });
  const toPic = () => navi('/categories/pic', { replace: true });
  const toAntique = () => navi('/categories/antique', { replace: true });

  // // 더미 데이터
  // const mockProducts = Array.from({ length: 11 }, (_, index) => ({
  //   id: index + 1,
  //   name: `상품 ${index + 1}`,
  //   price: 10000 + index * 1000,
  //   bids: Math.floor(Math.random() * 20),
  //   timeLeft: `${Math.floor(Math.random() * 5) + 1}일 남음`,
  //   seller: `판매자 ${String.fromCharCode(65 + (index % 5))}`, // A, B, C, D, E
  //   image: "https://thumbnail8.coupangcdn.com/thumbnails/remote/292x292ex/image/0820_amir_esrgan_inf80k_batch_1_max3k/b94b/26e39d5528dbad54fa05d0d935fa0b20b47f89eede86cb20bb680bd5a192.jpg",
  // })).sort((a, b) => b.id - a.id);

  // useEffect(() => {
  //   // 가짜 데이터 설정
  //   setProducts(mockProducts);
  //   setVisibleProducts(mockProducts.slice(0, itemsPerPage * 3)); // 처음에 15개 보여주기 (3줄)
  // }, []);

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
      <Conveyor />
      {products.length > 0 ? (
        <ProductLine products={products} />
      ) : (
        <p>상품이 없습니다.</p>
      )}
    </div>
  );
};

export default DetailedCategory;