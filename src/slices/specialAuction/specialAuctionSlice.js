import { createSlice } from '@reduxjs/toolkit';
import { getAuctionData } from '../../apis/specialAuction/SAapis';

const specialAuctionSlice = createSlice({
  name: 'specialAuction',
  initialState: {
    liveAuctionList: [],
    blindAuctionList: [],
    status: 'idle', // 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    setFormData: (state, action) => {
      return {
        ...state, // 기존 상태를 유지
        ...action.payload, // 새로운 데이터를 덮어쓰기
      };
    },
    setAuctionType: (state, action) => {
      state.auctionType = action.payload;
    },
    setCarouselData: (state, action) => { // 새로운 액션 생성
      state.carouselData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 실시간 or 블라인드 경매 리스트 로딩 중
      .addCase(getAuctionData.pending, (state) => {
        state.status = 'loading';
      })
      // 성공적으로 데이터 로드됨
      .addCase(getAuctionData.fulfilled, (state, action) => {
        state.status = 'succeeded';

        // 경매 타입에 따라 데이터를 분기 처리
        if (action.meta.arg === 'realtime') {
          state.liveAuctionList = action.payload.pageItems.content || []; // items 배열 할당
        } else if (action.meta.arg === 'blind') {
          state.blindAuctionList = action.payload.pageItems.content || []; // items 배열 할당
        }
      })
      // 데이터 로드 실패
      .addCase(getAuctionData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load auction data';
        console.error('Error fetching auction data: ', state.error);
      });
  },
});

export const { setFormData, setAuctionType, setCarouselData } = specialAuctionSlice.actions;

export default specialAuctionSlice.reducer;
