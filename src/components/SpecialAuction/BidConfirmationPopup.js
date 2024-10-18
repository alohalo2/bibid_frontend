import React from 'react';

function BidConfirmationPopup({ bidAmount, confirmBid, handleClosePopup }) {

  const formattedbidAmountToConfirm = bidAmount.toLocaleString();

  return (
    <div className="SAoverlay">
      <div className="SAbidConfirmationPopup">
        <div className='SAbidConfirmationHeader'>
          <img src='../../../images/bid_confirm_alert_icon.svg'></img>
          <h2>입찰확인</h2>
        </div>
        <div className='SAbidConfirmationContour'></div>
        <p>
          {formattedbidAmountToConfirm} 원으로 입찰하시겠습니까?
        </p>
        <div className='SAbidConfirmationContour'></div>
        <div className="SAbidConfirmationButtons">
          <button onClick={confirmBid}>입찰하기</button>
          <button onClick={handleClosePopup}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default BidConfirmationPopup;
