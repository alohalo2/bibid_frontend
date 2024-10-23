import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getBoards } from '../../api/ProductApi';

const searchSlice = createSlice({
    name: 'auction',
    initialState: {
        boards: [], // 검색 결과를 저장할 배열
        searchCondition: 'all',
        searchKeyword: ''
    },
    reducers: {
        change_searchCondition(state, action) {
            state.searchCondition = action.payload;
        },
        change_searchKeyword(state, action) {
            state.searchKeyword = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBoards.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.boards = action.payload.items || []; // 응답 데이터에서 items 배열을 가져옴
            });
        builder.addCase(getBoards.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message; // 오류 메시지 저장
            });
    },
});

// 액션 내보내기
export const { change_searchCondition, change_searchKeyword } = searchSlice.actions;

// 리듀서 내보내기
export default searchSlice.reducer;