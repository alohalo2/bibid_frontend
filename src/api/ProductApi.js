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