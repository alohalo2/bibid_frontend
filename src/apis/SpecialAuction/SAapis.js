import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAuctionData = createAsyncThunk(
  'specialAuction/getAuctionData',
  async (auctionType, thunkApi) => {
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');

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


