import React, { useEffect, useState, useCallback } from 'react';
import '../../css/Category.css';
import Conveyor from '../../components/Category/Conveyor';
import axios from 'axios';
import SearchBar from '../../components/Search/SearchBar';
import { useSelector } from 'react-redux';
import ProductLineForSearch from '../../components/Category/ProductLineForSearch';

export const Search = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const itemsPerPage = 5;
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const searchCondition = useSelector(state => state.auction.searchCondition);
    const searchKeyword = useSelector(state => state.auction.searchKeyword);

    const fetchSearchProducts = useCallback(async () => {
        try {
            setIsLoading(true);
            console.log("Fetching products with:", searchCondition, searchKeyword);
            const response = await axios.get(`http://localhost:8080/auction/${searchCondition}/${searchKeyword}`, {
                params: { page: page, size: itemsPerPage }
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
    }, [page, searchCondition, searchKeyword]);

    // 검색 조건이나 키워드가 변경될 때마다 제품 초기화
    useEffect(() => {
        setProducts([]);
        setPage(0);
        window.scrollTo(0, 0);
        console.log('asdsadawsdasd');
        
    }, [searchCondition, searchKeyword]);

    // 페이지가 변경될 때마다 검색 제품을 가져옴
    useEffect(() => {
        if (searchCondition && searchKeyword) {
            fetchSearchProducts();
        }
    }, [fetchSearchProducts, searchCondition, searchKeyword]);

    const loadMore = useCallback(() => {
        if (hasMore && !isLoading) {
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
                }, 50);
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
            
            <div className='blank' />
            <SearchBar fetchSearchProducts={fetchSearchProducts}/>
            <div className='DC_productContainer'>
                {products.length > 0 ? (
                    <ProductLineForSearch products={products} />
                ) : (
                    <p>검색된 상품이 없습니다.</p>
                )}
            </div>
            <div className='blank' />
        </div>
    );
};

export default Search;