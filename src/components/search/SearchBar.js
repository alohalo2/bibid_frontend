import { Button, Container, Grid, NativeSelect, TextField } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearchCondition, changeSearchKeyword } from '../../slices/search/searchSlice'; // 수정된 액션 이름 사용
import { getBoards } from '../../apis/product/ProductApi';
import '../../css/Category.css';

const SearchBar = () => {
    const dispatch = useDispatch();
    const searchCondition = useSelector(state => state.auction.searchCondition);
    const searchKeyword = useSelector(state => state.auction.searchKeyword);

    const handleChangeSearchCondition = useCallback((e) => {
        dispatch(changeSearchCondition(e.target.value));
    }, [dispatch]);

    const handleChangeSearchKeyword = useCallback((e) => {
        dispatch(changeSearchKeyword(e.target.value)); 
    }, [dispatch]);

    const handleSearch = useCallback((e) => {
        e.preventDefault();

        if (searchKeyword === '') {

            alert('검색어를 입력해주세요');
            
        } else {

        dispatch(getBoards({
            searchCondition: searchCondition, 
            searchKeyword: searchKeyword,
            page: 0
        }));
        
    }
    }, [dispatch, searchCondition, searchKeyword]);

    return (
        <Container component='div' style={{marginTop: '3%', 
                                           widows: '1200px', 
                                           height: '200px',
                                           display: 'flex',
                                           justifyContent: 'center',
                                           alignItems: 'center',
                                           backgroundColor: '#F1F1F1'
                                           }}>
            <form onSubmit={handleSearch}>
                <div className='SB_searchContainer'>
                    <div className='SB_searchCondition'>
                        <NativeSelect
                            defaultValue={searchCondition}
                            inputProps={{
                                name: 'searchCondition'
                            }}
                            fullWidth
                            onChange={handleChangeSearchCondition}
                            sx={{
                                border: 'none',
                                '&:before, &:after': {
                                    display: 'none',
                                }
                            }}
                            style={{ width: '140px',
                                     backgroundColor: 'white',
                                     paddingLeft: '10px'
                             }}
                        >
                            <option value='all'>전체</option>
                            <option value='productName'>물품 제목</option>
                            <option value='category'>카테고리</option>
                            <option value='productDescription'>글 내용</option>
                        </NativeSelect>
                    </div>
                        <div className='SB_textFiled'>
                            <Container component='div' style={{ 
                                                                border: '2px solid #BFBFBF', 
                                                                borderRadius: '5px', 
                                                                width: '500px', 
                                                                height: '35px',
                                                                backgroundColor: 'white' 
                                                                }}>
                                <TextField
                                    name='searchKeyword'
                                    fullWidth
                                    variant='standard'
                                    value={searchKeyword}
                                    onChange={handleChangeSearchKeyword}
                                    InputProps={{ disableUnderline: true }}
                                    style={{
                                    }}
                                />
                            </Container>
                        </div>
                        <Button type='submit' className='SB_Button'>
                            검색
                        </Button>
                </div>
            </form>
        </Container>
    );
};

export default SearchBar;