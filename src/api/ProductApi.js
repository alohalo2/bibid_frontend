import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 카테고리별 상품을 가져오는 API
export const getProductsByCategory = createAsyncThunk(
    'products/getByCategory',
    async (category, thunkApi) => {
        try {
            const response = await axios.get(`http://localhost:8080/category/${category}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
                }
            });
            return response.data.item; // ResponseDto의 item에 접근
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
); 

export const getBoards = createAsyncThunk(
    'auction/getBoards',
    async (searchObj, thunkApi) => {
        try {
            const response = await axios.get(`http://localhost:8080/auction/${searchObj.searchCondition}/${searchObj.searchKeyword}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
                },
                params: {
                    searchCondition: searchObj.searchCondition,
                    searchKeyword: searchObj.searchKeyword,
                    page: searchObj.page
                }
            });
            console.log(response.data);
            return response.data;
        } catch (e) {
            console.error('Error fetching boards:', e); // 에러 로그 추가
            return thunkApi.rejectWithValue(e);
        }
    }
);