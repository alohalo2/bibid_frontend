import React, { useEffect } from 'react';
import '../../css/Category.css';
import Conveyor from '../../components/Category/Conveyor';
import SearchBar from '../../components/Search/SearchBar'; // 기존 SearchBar 사용
import { useSelector, useDispatch } from 'react-redux';
import ProductLineForSearch from '../../components/Category/ProductLineForSearch';
import { getBoards } from '../../api/ProductApi';
import SAtab from '../../components/SpecialAuction/SAtab';

export const Search = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.auction.boards);

    useEffect(() => {
        // 로컬 스토리지에서 검색 조건과 키워드 가져오기
        const searchCondition = localStorage.getItem('searchCondition') || 'all';
        const searchKeyword = localStorage.getItem('searchKeyword') || '';

        // API 호출
        dispatch(getBoards({
            searchCondition,
            searchKeyword,
            page: 0
        }));
    }, [dispatch]);

    return (
        <div className='CTG_category'>
            <div className='blank' />
            <SearchBar />
            <div className='blank' />
            <div className='DC_productContainer'>
                {products.length > 0 ? (
                    <ProductLineForSearch />
                ) : (
                    <p>검색된 상품이 없습니다.</p>
                )}
            </div>
            <div className='blank' />
            <SAtab activeTab={'realtime'} />
            <div className='blank' />
        </div>
    );
};

export default Search;