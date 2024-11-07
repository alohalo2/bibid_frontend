import React, { useEffect } from 'react';
import '../../css/Category.css';
import Conveyor from '../../components/category/Conveyor';
import SearchBar from '../../components/search/SearchBar'; // 기존 SearchBar 사용
import { useSelector, useDispatch } from 'react-redux';
import ProductLineForSearch from '../../components/category/ProductLineForSearch';
import { getBoards } from '../../apis/product/ProductApi';
import SAtab from '../../components/specialAuction/SAtab';

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

    const searchKeyword = localStorage.getItem('searchKeyword') || '';

    return (
        <div className='CTG_category'>
            <div className='blank' />
            {/* <SearchBar /> */}
            <div className='CTG_searchInfo_box'> 
                <div className='CTG_searchInfo'>
                검색어 '{searchKeyword}'의 검색결과 입니다. 
                </div>
            </div>
            <div className='blank' />
            <div className='DC_productContainer'>
                <div className='DC_productContainer_header'>
                    <h2>일반 경매</h2>
                </div>
                <div className='DC_productContainer_result_box'>
                    {products.length > 0 ? (
                        <ProductLineForSearch />
                    ) : (
                        <p id='DC_productContainer_result'>검색된 상품이 없습니다.</p>
                    )}
                </div>
            </div>
            <div className='blank' />
            <SAtab activeTab={'realtime'} />
            <div className='blank' />
        </div>
    );
};

export default Search;