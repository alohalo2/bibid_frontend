import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API 호출을 위한 비동기 thunk
export const getBoards = createAsyncThunk(
    'auction/getBoards',
    async ({ searchCondition, searchKeyword, page }, thunkApi) => {
        try {
            const response = await axios.get(`http://localhost:8080/auction/${searchCondition}/${searchKeyword}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
                },
                params: {
                    searchCondition,
                    searchKeyword,
                    page
                }
            });
            return response.data; // 응답 데이터를 반환
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);

const searchSlice = createSlice({
    name: 'auction',
    initialState: {
        boards: [], // 검색 결과를 저장할 배열
        searchedAuctionList: [],
        searchCondition: 'all',
        searchKeyword: '',
        status: 'idle', // idle, loading, succeeded, failed
        error: null
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
        builder
            .addCase(getBoards.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.boards = action.payload.items || []; // 응답 데이터에서 items 배열을 가져옴
            })
            .addCase(getBoards.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message; // 오류 메시지 저장
            });
    },
});

// 액션 내보내기
export const { change_searchCondition, change_searchKeyword } = searchSlice.actions;

// 리듀서 내보내기
export default searchSlice.reducer;