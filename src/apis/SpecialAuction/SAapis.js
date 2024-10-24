import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const getAuctionData = createAsyncThunk(
  'specialAuction/getAuctionData',
  async (auctionType, thunkApi) => {
    try {
       // js-cookie를 사용하여 쿠키 값을 가져옵니다.
       const token = Cookies.get('ACCESS_TOKEN');

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



