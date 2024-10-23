import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change_searchCondition, change_searchKeyword } from '../../slices/search/searchSlice';

const SearchBar = ({ fetchSearchProducts}) => {
    const dispatch = useDispatch();
    const searchCondition = useSelector(state => state.auction.searchCondition);
    const searchKeyword = useSelector(state => state.auction.searchKeyword);
    
    // 로컬 상태로 입력값 관리
    const [localKeyword, setLocalKeyword] = useState(searchKeyword);

    const changeSearchCondition = useCallback((e) => {
        dispatch(change_searchCondition(e.target.value));
    }, [dispatch]);

    const handleKeywordChange = (e) => {
        setLocalKeyword(e.target.value);
    };

    const handleSearch = useCallback((e) => {
        e.preventDefault();

        if (searchCondition === 'all' && !localKeyword.trim()) {
            alert("검색어를 입력해 주세요.");
            return;
        }

        // URL 쿼리 업데이트
        const queryParams = new URLSearchParams({
            condition: searchCondition,
            keyword: localKeyword.trim(),
        }).toString();

        window.history.pushState(null, '', `?${queryParams}`);
        
        // 검색 키워드 업데이트는 검색 시에만
        dispatch(change_searchKeyword(localKeyword.trim()));

        // 검색 실행
        fetchSearchProducts(); // 새로운 검색 실행
    }, [dispatch, searchCondition, localKeyword, fetchSearchProducts]);

    const isButtonDisabled = !localKeyword.trim() && searchCondition !== 'all';

    return (
        <div style={{ marginTop: '3%', maxWidth: '600px', margin: '0 auto' }}>
            <form onSubmit={handleSearch}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <select
                        value={searchCondition}
                        onChange={changeSearchCondition}
                        style={{ marginRight: '8px', padding: '8px' }}
                    >
                        <option value='all'>전체</option>
                        <option value='productName'>물품 제목</option>
                        <option value='category'>카테고리</option>
                        <option value='productDescription'>글 내용</option>
                    </select>
                    <input
                        type='text'
                        name='searchKeyword'
                        value={localKeyword}
                        onChange={handleKeywordChange}
                        style={{ flex: 1, marginRight: '8px', padding: '8px' }}
                        placeholder='검색어를 입력하세요'
                    />
                    <button type='submit' disabled={isButtonDisabled}>
                        검색
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;