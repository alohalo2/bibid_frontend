import React from 'react'
import '../../css/Mypage/Mypage.css';
import MypageMyAuctionCard from './MypageMyAuctionCard';

const MypageAuctionManagement = () => {
  return (
    <div className='Mypage_AuctionBoxContainer'>
      <div className='Mypage_UserInfoTitle'>내가 등록한 경매</div>
      <div className='Mypage_AuctionMainContainer'>
          <div className='Mypage_AuctionInfoContainer'>
            <div className='Mypage_AuctionCategory'>
              <div>카테고리 선택</div>
            </div>
            <div className='Mypage_AuctionCategoryBtnContainer'>
              <div className='Mypage_AuctionCategoryBtn'>일반 경매</div>
              <div className='Mypage_AuctionCategoryBtn'>실시간 경매</div>
            </div>
          </div>
          <div className='Mypage_blank'/>
            <div className='Mypage_AuctionManagementBar'>
              <div className='Mypage_AuctionManagementImg'>대표사진</div>
              <div className='Mypage_AuctionManagementTitle'>제목</div>
              <div className='Mypage_AuctionManagementPrice'>현재가</div>
              <div className='Mypage_AuctionManagementBid'>입찰 단위</div>
              <div className='Mypage_AuctionManagementPeriod'>경매 기간</div>
              <div className='Mypage_AuctionManagementDeleteBtn'></div>
            </div>
          <div className='Mypage_AuctionManagementContinaer'>
            <MypageMyAuctionCard/>
          </div>
        </div>
    </div>
  )
}

export default MypageAuctionManagement