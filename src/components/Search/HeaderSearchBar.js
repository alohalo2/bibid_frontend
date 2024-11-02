import { Button, Container, Grid, TextField } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearchCondition, changeSearchKeyword } from '../../slices/search/searchSlice';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/search_icon.svg';

const HeaderSearchBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchCondition = useSelector(state => state.auction.searchCondition);
    const searchKeyword = useSelector(state => state.auction.searchKeyword);

    // 컴포넌트가 마운트될 때 searchKeyword를 빈 문자열로 초기화
    useEffect(() => {
        dispatch(changeSearchKeyword(''));
    }, [dispatch]);

    const handleChangeSearchKeyword = useCallback((e) => {
        dispatch(changeSearchKeyword(e.target.value));
    }, [dispatch]);

    const handleSearch = useCallback((e) => {
        e.preventDefault();

        if (searchKeyword === '') {
            alert('검색어를 입력해주세요');
        } else {
            // 로컬 스토리지에 검색 조건과 키워드 저장
            localStorage.setItem('searchCondition', searchCondition);
            localStorage.setItem('searchKeyword', searchKeyword);
            
            // /search로 이동
            window.location.href = '/search';
        }
    }, [dispatch, searchCondition, searchKeyword, navigate]);

    return (
        <div className='headerSearchContainer' style={{ border: '2px solid #BFBFBF', borderRadius: '10px', width: '360px', height: '35px' }}>
            <Container className='headerSearchBox' component='div' maxWidth='md'>
                <form onSubmit={handleSearch}>
                    <Grid container spacing={1}>
                        <Grid item xs={10}>
                            <TextField
                                className='headerSearchBarTextField'
                                name='searchKeyword'
                                fullWidth
                                variant='standard'
                                value={searchKeyword}
                                onChange={handleChangeSearchKeyword}
                                InputProps={{ disableUnderline: true }}
                                style={{ marginTop: '2px', marginLeft: '15px' }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <div style={{ display: 'flex',
                                          justifyContent: 'center',
                                          alignItems: 'center'
                             }}>
                                <div style={{
                                        display: 'felx',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '25px',
                                        height: '25px',
                                        backgroundColor: 'transparent', 
                                        backgroundImage: `url(${logo})`, 
                                        backgroundSize: 'contain', 
                                        backgroundRepeat: 'no-repeat',
                                        cursor: 'pointer',
                                        marginTop: '5px'
                                        }}
                                        onClick={handleSearch}
                                        > 
                                </div>
                            </div>
                            {/* <Button
                                type='submit'
                                style={{
                                    width: '30px', 
                                    height: '30px',
                                    backgroundColor: 'transparent', // 배경색 제거
                                    backgroundImage: `url(${logo})`, // logo를 배경 이미지로 설정
                                    backgroundSize: 'contain', // 이미지 크기 조절
                                    backgroundRepeat: 'no-repeat', // 반복하지 않도록 설정
                                    border: 'none', // 테두리 제거
                                    cursor: 'pointer', // 커서 변경
                                    marginTop: '6px',
                                    marginLeft: '20px'
                                }}
                            >
                            </Button> */}
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    );
};

export default HeaderSearchBar;