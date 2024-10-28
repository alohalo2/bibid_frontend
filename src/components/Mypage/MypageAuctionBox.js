import React from 'react'
import '../../css/Mypage/Mypage.css';
import MypageAuctionCard from './MypageAuctionCard';

const MypageProfileBox = () => {
  return (
    <div className='Mypage_AuctionBoxContainer'>
      <div className='Mypage_UserInfoTitle'>낙찰받은 경매 목록</div>
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
            <MypageAuctionCard/>
            <MypageAuctionCard/>
            <MypageAuctionCard/>
            <MypageAuctionCard/>
            <MypageAuctionCard/>
            <MypageAuctionCard/>
          </div>
        </div>
    </div>
  )
}

export default MypageProfileBox