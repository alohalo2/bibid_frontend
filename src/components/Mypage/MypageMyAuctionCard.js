import React from 'react'
import '../../css/Mypage/Mypage.css';
import MypageAuctionProcessLine from './MypageAuctionProcessLine';

const MypageMyAuctionCard = () => {
  return (
    <div className='Mypage_AuctionManagementCard'>
      <div className='Mypage_AuctionManagementCardImgBox'>
        <div className='Mypage_AuctionManagementCardImg'></div>
      </div>
      <div className='Mypage_AuctionManagementCardTitleBox'>
        <div className='MypageAuctionManagementCardTitle'>제목입니다.</div>
      </div>
      <div className='Mypage_AuctionManagementCardPrice'>50000 원</div>
      <div className='Mypage_AuctionManagementCardBid'> 5000 원</div>
      <div className='Mypage_AuctionManagementCardPeriod'>xxxx.xx.xx ~ yyyy.yy.yy </div>
      <div className='Mypage_AuctionManagementCardDeleteBtnBox'>
        <div className='Mypage_AuctionManagementCardDeleteBtn'>삭제</div>
      </div>
    </div>
  )
}

export default MypageMyAuctionCard