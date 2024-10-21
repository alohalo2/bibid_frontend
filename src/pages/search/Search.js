import React, { useEffect, useState, useCallback } from 'react';
import '../../css/Category.css';
import Conveyor from '../../components/Category/Conveyor';
import CategoryMenu from '../../components/Category/CategoryMenu';
import ProductLine from '../../components/Category/ProductLine';
import axios from 'axios';
import SearchBar from '../../components/Search/SearchBar';
import { useSelector } from 'react-redux'; // Redux에서 상태 가져오기

export const Search = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const itemsPerPage = 5; // 한 페이지에 표시할 아이템 수
    const [hasMore, setHasMore] = useState(true); // 추가 데이터 여부

    // Redux에서 searchCondition과 searchKeyword 가져오기
    const searchCondition = useSelector(state => state.auction.searchCondition);
    const searchKeyword = useSelector(state => state.auction.searchKeyword);

    // 상품을 가져오는 함수
    const fetchBestProducts = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/auction/${searchCondition}/${searchKeyword}`, {
                params: { page }
            });

            if (response.status === 200) {
                const data = response.data.pageItems.content || [];
                
                // 이전 데이터에 새 데이터를 추가
                setProducts(data);
                
                // 남은 데이터가 5개 미만이면 더 이상 불러오지 않도록 설정
                setHasMore(data.length === itemsPerPage);
            } else {
                console.error('상품 가져오기 실패');
                setHasMore(false);
            }
        } catch (error) {
            console.error('베스트 상품을 가져오는 중 오류 발생:', error);
            setHasMore(false);
        }
    }, [searchCondition, searchKeyword, page]); // 의존성 배열에 추가

    // 검색어가 변경될 때마다 제품 목록을 초기화
    useEffect(() => {
        if (searchCondition && searchKeyword) {
            setProducts([]); // 이전 결과 초기화
            setPage(0); // 페이지 초기화
            fetchBestProducts(); // 초기 검색 실행
        }
    }, [searchCondition, searchKeyword, fetchBestProducts]);

    const loadMore = useCallback(() => {
        if (hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    }, [hasMore]);

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
            <SearchBar/>
            <div className='DC_productContainer'>
                {products.length > 0 ? (
                    <ProductLine products={products} />
                ) : (
                    <p>상품이 없습니다.</p>
                )}
            </div>
            <div className='blank'/>
        </div>
    );
};

export default Search;