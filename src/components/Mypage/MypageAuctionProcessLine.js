import React from 'react'
import '../../css/Mypage/Mypage.css';

const MypageAuctionProcessLine = ({auctionStatus}) => {
  return (
    <div className='Mypage_AuctionProcessLine'>
      <div className='Mypage_AuctionProcessLinePoint'>

      </div>
      <div className='Mypage_AuctionProcessLineText'>
        <div style={{ color: auctionStatus === "경매 시작" ? 'red' : 'black' }}>경매 시작</div>
        <div style={{ color: auctionStatus === "경매 완료" ? 'red' : 'black' }}>경매 완료</div>
        <div style={{ color: auctionStatus === "결제 완료" ? 'red' : 'black' }}>결제 완료</div>
        <div style={{ color: auctionStatus === "배송중" ? 'red' : 'black' }}>배송중</div>
        <div style={{ color: auctionStatus === "배송 완료" ? 'red' : 'black' }}>배송 완료</div>
      </div>
    </div>
  )
}

export default MypageAuctionProcessLine