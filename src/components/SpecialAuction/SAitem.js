import React from 'react';
import '../../css/SpecialAuction/SAitem.css';

function SAitem({ imageSrc, title, auctionDate, auctionTime, linkText, alertText, handleGoButtonClick, handleAlertButtonClick}) {

  return (
    <div className="SAauctionItem">
      <img src={imageSrc} alt={title} className="SAauctionImage" />
      <div className="SAauctionDetails">
        <h3>{title}</h3>
        <p>경매 날짜: {auctionDate}</p>
        <p>경매 시간: {auctionTime}</p>
        <p className="SAalertText">* 알림은 경매 시작 30분 전에 발송됩니다.<br/>* 실시간 경매는 참여 인원수가 5000명으로 제한됩니다.</p>
      </div>
      <div className="SAauctionButtons">
        <button className="SAgoButton" onClick={handleGoButtonClick}>바로가기</button>
        <button className="SAalertButton" onClick={handleAlertButtonClick}>알림신청</button>
      </div>
    </div>
  );
}

export default SAitem;