import React from 'react';

function BuyerWaitPopup({ handleClosePopup, formattedParticipantCount }) {

  return (
    <div className="SAoverlay">
      <div className="SAwaitPopup">
        <div className='SAliveOnOffBox'>
          <h3>Live Off</h3>
        </div>
        <div className='SAbuyerWaitCommnetBox'>
          <h1>{formattedParticipantCount}명 대기중...</h1>
          <p>곧 실시간 경매가 시작될 예정입니다.</p>
          <p>잠시만 대기 해주시면 곧 경매가 시작됩니다.</p>
        </div>
        <button className="SAcloseButton" onClick={handleClosePopup}>
          <img src='/images/white_close_button_icon.svg' alt="close button"/>
        </button>
      </div>
    </div>
  );
}

export default BuyerWaitPopup;
