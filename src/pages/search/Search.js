import React, { useEffect, useState, useCallback } from 'react';
import '../../css/Category.css';
import Conveyor from '../../components/Category/Conveyor';
import SearchBar from '../../components/Search/SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import ProductLineForSearch from '../../components/Category/ProductLineForSearch';
import { getBoards } from '../../api/ProductApi';

export const Search = () => {
    const [page, setPage] = useState(0);
    const itemsPerPage = 5;
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const boards = useSelector(state => state.auction.boards);
    const searchCondition = useSelector(state => state.auction.searchCondition);
    const searchKeyword = useSelector(state => state.auction.searchKeyword);
    const products = useSelector(state => state.auction.boards);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBoards({
            searchCondition: 'all',
            searchKeyword: '',
            page: 0
        }));
    }, [dispatch]);

    // useEffect(() => {
    //     if (boards) {
    //         // boards 데이터를 products로 설정
    //         setProducts(boards);
    //     }
    // }, [boards]);

    
    return (
        <div className='CTG_category'>
            <div className='blank' />
            
            <div className='blank' />
            <SearchBar />
            <div className='DC_productContainer'>
                {products.length > 0 ? (
                    <ProductLineForSearch/>
                ) : (
                    <p>검색된 상품이 없습니다.</p>
                )}
            </div>
            <div className='blank' />
        </div>
    );
};

export default Search;