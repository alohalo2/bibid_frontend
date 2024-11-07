import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBoards } from '../../apis/product/ProductApi';

const searchSlice = createSlice({
    name: 'search', // 'boards'에서 'search'로 변경하여 슬라이스 이름 통일
    initialState: {
        boards: [], // 검색 결과를 저장할 배열
        searchCondition: 'all',
        searchKeyword: '',
        error: null // 에러 상태를 추가
    },
    reducers: {
        changeSearchCondition(state, action) {
            state.searchCondition = action.payload;
        },
        changeSearchKeyword(state, action) {
            state.searchKeyword = action.payload;
        },
        setBoards(state, action) {
            state.boards = action.payload;
        },
        clearSearchResults(state) {
            state.boards = [];
            state.searchCondition = 'all';
            state.searchKeyword = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBoards.fulfilled, (state, action) => {
            // action.payload의 구조를 안전하게 검사
            if (action.payload && action.payload.pageItems.content) {
                state.boards = action.payload.pageItems.content;
                state.searchCondition = action.payload.item?.searchCondition || 'all'; // 안전하게 기본값 설정
                state.searchKeyword = action.payload.item?.searchKeyword || ''; // 안전하게 기본값 설정
            }
        });
        builder.addCase(getBoards.rejected, (state, action) => {
            state.error = action.error.message; // 에러 메시지를 상태에 저장
            alert('에러가 발생했습니다.');
        });
    },
});

// 액션 내보내기
export const { changeSearchCondition, changeSearchKeyword, setBoards, clearSearchResults } = searchSlice.actions;

// 리듀서 내보내기
export default searchSlice.reducer;