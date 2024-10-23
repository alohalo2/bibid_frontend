import { Button, Container, Grid, NativeSelect, TextField } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearchCondition, changeSearchKeyword } from '../../slices/search/searchSlice'; // 수정된 액션 이름 사용
import { getBoards } from '../../api/ProductApi';

const SearchBar = () => {
    const dispatch = useDispatch();
    const searchCondition = useSelector(state => state.auction.searchCondition);
const searchKeyword = useSelector(state => state.auction.searchKeyword);

    const handleChangeSearchCondition = useCallback((e) => {
        dispatch(changeSearchCondition(e.target.value)); // 수정된 액션 이름 사용
    }, [dispatch]);

    const handleChangeSearchKeyword = useCallback((e) => {
        dispatch(changeSearchKeyword(e.target.value)); // 수정된 액션 이름 사용
    }, [dispatch]);

    const handleSearch = useCallback((e) => {
        e.preventDefault();

        dispatch(getBoards({
            searchCondition: searchCondition, // 수정된 searchCondition 사용
            searchKeyword: searchKeyword, // 수정된 searchKeyword 사용
            page: 0
        }));
    }, [dispatch, searchCondition, searchKeyword]);

    return (
        <Container component='div' maxWidth='md' style={{marginTop: '3%'}}>
            <form onSubmit={handleSearch}>
                <Grid container spacing={1}>
                    <Grid item md={3}>
                        <NativeSelect
                            defaultValue={searchCondition}
                            inputProps={{
                                name: 'searchCondition'
                            }}
                            fullWidth
                            onChange={handleChangeSearchCondition} // 수정된 함수 이름 사용
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
                            value={searchKeyword}
                            onChange={handleChangeSearchKeyword} // 수정된 함수 이름 사용
                        />
                    </Grid>
                    <Grid item md={2}>
                        <Button type='submit' color='primary'>
                            검색
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default SearchBar;