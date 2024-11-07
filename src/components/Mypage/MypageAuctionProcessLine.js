import React from 'react';
import '../../css/Mypage/Mypage.css';

const MypageAuctionProcessLine = ({ auctionStatus }) => {
  let progressValue = 0;
  let circlePosition = 0; // 원의 위치를 저장할 변수

  switch (auctionStatus) {
    case "경매 시작":
      progressValue = 0;
      circlePosition = 0; // 0px
      break;
    case "낙찰":
      progressValue = 0.3333333333333333;
      circlePosition = 110; // 110px
      break;
    case "배송중":
      progressValue = 0.6666666666666666;
      circlePosition = 220; // 220px
      break;
    case "배송 완료":
      progressValue = 1.0;
      circlePosition = 330; // 330px
      break;
    default:
      progressValue = 0;
      circlePosition = 0; // 기본값
      break;
  }

  return (
    <div className='Mypage_AuctionProcessLine'>
      <div className='Mypage_AuctionProcessLinePoint'>
        <div className='progress-container'>
          <div className='progress-bar' style={{ width: `${progressValue * 100}%` }}>
            <div className='progress-circle' style={{ left: `${circlePosition}px` }} />
          </div>
        </div>
      </div>
      <div className='Mypage_AuctionProcessLineText'>
        <div style={{ color: auctionStatus === "경매 시작" ? 'blue' : 'darkgray' }}>
            <p>경매 시작</p>
        </div>
        <div style={{ color: auctionStatus === "낙찰" ? 'blue' : 'darkgray' }}>
            <p>낙찰</p>
        </div>
        <div style={{ color: auctionStatus === "배송중" ? 'blue' : 'darkgray' }}>
            <p>배송중</p>
        </div>
        <div style={{ color: auctionStatus === "배송 완료" ? 'blue' : 'darkgray' }}>
            <p>배송 완료</p>
        </div>
      </div>
    </div>
  );
}

export default MypageAuctionProcessLine;