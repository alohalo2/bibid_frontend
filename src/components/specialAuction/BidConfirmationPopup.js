import React from 'react';

function BidConfirmationPopup({ auction, webSocketProps, handleClosePopup }) {
  const { bidAmounts, handleBidSubmit } = webSocketProps;
  // auctionIndex에 해당하는 입찰 금액을 가져오고, 값이 없으면 기본값을 설정
  const bidAmount = bidAmounts[auction?.auctionIndex] || 0;
  const formattedbidAmountToConfirm = bidAmount.toLocaleString();
  
  return (
    <div className="SAoverlay">
      <div className="SAbidConfirmationPopup">
        <div className='SAbidConfirmationHeader'>
          <img src='../../../images/bid_confirm_alert_icon.svg' alt="Bid Confirm" />
          <h2>입찰확인</h2>
        </div>
        <div className='SAbidConfirmationContour'></div>
        <p>
          {formattedbidAmountToConfirm} 원으로 입찰하시겠습니까?
        </p>
        <div className='SAbidConfirmationContour'></div>
        <div className="SAbidConfirmationButtons">
          <button
            onClick={() => {
              handleBidSubmit(webSocketProps.bidAmounts[auction.auctionIndex]);
              handleClosePopup(); // 입찰 후 팝업 닫기
            }}
          >
            <p>입찰하기</p>
          </button>
          <button onClick={handleClosePopup}>
            <p>취소</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BidConfirmationPopup;
