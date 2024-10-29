import React from 'react'
import '../../css/Mypage/Mypage.css';

const MypageAuctionProcessLine = () => {
  return (
    <div className='Mypage_AuctionProcessLine'>
      <div className='Mypage_AuctionProcessLinePoint'>

      </div>
      <div className='Mypage_AuctionProcessLineText'>
        <div>경매 진행중</div>
        <div>경매 완료</div>
        <div>결제 완료</div>
        <div>배송중</div>
        <div>배송 완료</div>
      </div>
    </div>
  )
}

export default MypageAuctionProcessLine