import { Button, Container, Grid, NativeSelect, TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change_searchCondition, change_searchKeyword } from '../../slices/search/searchSlice';
import { getBoards } from '../../api/ProductApi';

const SearchBar = () => {
    const dispatch = useDispatch();
    const searchCondition = useSelector(state => state.auction.searchCondition);
    
    const [localSearchKeyword, setLocalSearchKeyword] = useState(''); // 로컬 상태로 관리

    const changeSearchCondition = useCallback((e) => {
        dispatch(change_searchCondition(e.target.value));
    }, [dispatch]);

    const changeSearchKeyword = useCallback((e) => {
        setLocalSearchKeyword(e.target.value); // 로컬 상태 업데이트
    }, []);

    const handleSearch = useCallback((e) => {
        e.preventDefault();
        
        // 유효성 검사: 검색어가 비어있고 조건이 'all'이 아닐 때 검색하지 않음
        if (!localSearchKeyword.trim() && searchCondition !== 'all') {
            alert("검색어를 입력해 주세요.");
            return;
        }
    
        // 검색어 설정
        const keyword = localSearchKeyword.trim(); // 모든 경우에 검색어를 전달
        dispatch(change_searchKeyword(keyword));
    
        // 검색 실행
        dispatch(getBoards({
            searchCondition,
            searchKeyword: keyword,
        }));
    
        // 검색 후 로컬 상태 초기화
        setLocalSearchKeyword(''); 
    }, [dispatch, searchCondition, localSearchKeyword]);

    // 버튼 활성화 조건
    const isButtonDisabled = !localSearchKeyword.trim() && searchCondition !== 'all';

    return (
        <Container component='div' maxWidth='md' style={{ marginTop: '3%' }}>
            <form onSubmit={handleSearch}>
                <Grid container spacing={1}>
                    <Grid item md={3}>
                        <NativeSelect
                            value={searchCondition}
                            inputProps={{
                                name: 'searchCondition'
                            }}
                            fullWidth
                            onChange={changeSearchCondition}
                        >   
                            <option value='all'>전체</option>
                            <option value='productName'>물품 제목</option>
                            <option value='category'>카테고리</option>
                            <option value='productDescription'>글 내용</option>
                        </NativeSelect>
                    </Grid>
                    <Grid item md={7}>
                        <TextField
                            name='searchKeyword'
                            fullWidth
                            variant='standard'
                            value={localSearchKeyword} // 로컬 상태 사용
                            onChange={changeSearchKeyword}
                        />
                    </Grid>
                    <Grid item md={2}>
                        <Button type='submit' color='primary' disabled={isButtonDisabled}>
                            검색
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default SearchBar;