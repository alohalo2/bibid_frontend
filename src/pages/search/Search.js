import React, { useEffect, useState, useCallback } from 'react';
import '../../css/Category.css';
import Conveyor from '../../components/Category/Conveyor';
import CategoryMenu from '../../components/Category/CategoryMenu';
import ProductLine from '../../components/Category/ProductLine';
import axios from 'axios';
import SearchBar from '../../components/Search/SearchBar';
import { useSelector } from 'react-redux';

export const Search = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const itemsPerPage = 5;
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const searchCondition = useSelector(state => state.auction.searchCondition);
    const searchKeyword = useSelector(state => state.auction.searchKeyword);

    const fetchBestProducts = useCallback(async () => {
        if (!searchCondition) return; // searchCondition이 없으면 리턴
    
        setIsLoading(true);
        try {
            const params = { page, size: itemsPerPage };
            
            // searchCondition이 'all'일 때 searchKeyword를 포함하지 않음
            const response = await axios.get(`http://localhost:8080/auction/${searchCondition}/${searchKeyword}`, {
                params,
            });
    
            if (response.status === 200) {
                const data = response.data.pageItems.content || [];
        
                if (data.length === 0) {
                  setHasMore(false);
                } else {
                  setProducts(prevProducts => [...prevProducts, ...data]);
                  setHasMore(data.length === itemsPerPage);

                  console.log(data);
                }
              } else {
                console.error('상품 가져오기 실패');
                setHasMore(false);
              }
        } catch (error) {
            console.error('상품 가져오기 중 오류 발생:', error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    }, [searchCondition, searchKeyword, page]);

    useEffect(() => {
        if (searchCondition && searchKeyword) {
            setProducts([]);
            setPage(0);
            fetchBestProducts();
        }
    }, [searchCondition, searchKeyword, fetchBestProducts]);

    const loadMore = useCallback(() => {
        if (hasMore && !isLoading) { // 로딩 중이 아닐 때만 페이지 증가
          setTimeout(() => {
            setPage(prevPage => prevPage + 1);
          }, 50);
        }
      }, [hasMore]);

    useEffect(() => {
        let timeoutId;
        const handleScroll = () => {
          if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !isLoading) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
              loadMore();
            }, 200); // 0.2초 딜레이 추가
          }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
          clearTimeout(timeoutId);
        };
      }, [loadMore, isLoading]);

    return (
        <div className='CTG_category'>
            <div className='blank' />
            <Conveyor />
            <div className='blank' />
            <SearchBar />
            <div className='DC_productContainer'>
                {products.length > 0 ? (
                    <ProductLine products={products} />
                ) : (
                    <p>검색된 상품이 없습니다.</p>
                )}
            </div>
            <div className='blank' />
        </div>
    );
};

export default Search;