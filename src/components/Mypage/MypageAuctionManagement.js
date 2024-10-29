import React from 'react'
import '../../css/Mypage/Mypage.css';
import MypageMyAuctionCard from './MypageMyAuctionCard';

const MypageAuctionManagement = () => {
  return (
    <div className='Mypage_AuctionBoxContainer'>
      <div className='Mypage_UserInfoTitle'>경매 진행 현황</div>
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
          <div className='Mypage_AuctionCardContinaer'>
            <MypageMyAuctionCard/>
          </div>
        </div>
    </div>
  )
}

export default MypageAuctionManagement