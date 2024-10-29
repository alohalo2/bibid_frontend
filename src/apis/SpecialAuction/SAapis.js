import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAuctionData = createAsyncThunk(
  'specialAuction/getAuctionData',
  async (auctionType, thunkApi) => {
    try {

      const response = await axios.get('http://223.130.162.136:8080/specialAuction/list', {
        params: {
          auctionType: auctionType,
        }
      });

      console.log("getAuctionData: ", response.data);
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);



