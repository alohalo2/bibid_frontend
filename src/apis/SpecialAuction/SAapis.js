import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAuctionData = createAsyncThunk(
  'specialAuction/getAuctionData',
  async (auctionType, thunkApi) => {
    try {
      let token = sessionStorage.getItem('ACCESS_TOKEN');

      if (!token) {
        // sessionStorage에서 토큰이 없을 경우 localStorage에서 가져옴
        token = localStorage.getItem('ACCESS_TOKEN');
      }

      const response = await axios.get('http://localhost:8080/specialAuction', {
        params: {
          auctionType: auctionType,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("getAuctionData: ", response.data);
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);



