import React from 'react';
import '../../css/SpecialAuction/SAitem.css';

function SAitem({ imageSrc, title, auctionDate, price , auctionTime, linkText, handleGoButtonClick, handleAlertButtonClick}) {

  // console.log("SAitem: {}", imageSrc);

  return (
    <div className="SAauctionItem">
      <div className='SAauctionCard'>
        <img src={imageSrc} alt={title} className="SAauctionImage" />
        <div className="SAauctionDetails">
            <div className='SAauctionDetailsTitle'>
              <h3>{title}</h3>
            </div>
            <div className='SAauctionDetailsContentsBox'>
              <div>
                <div className='SAauctionPrice'>
                  <p>경매 시작가 :</p>
                </div>
                <div className='SAauctionDetailsDate'>
                  <p>경매 날짜 :</p>
                  <p>경매 시간 :</p>
                </div>
              </div>
              {/* <p className="SAalertText">* 알림은 경매 시작 30분 전에 발송됩니다.<br/>* 실시간 경매는 참여 인원수가 5000명으로 제한됩니다.</p> */}
              <div className='SAauctionDetailsResultBox'>
                <div className='SAauctionPrice'>
                  <p>{price.toLocaleString()} 원</p>
                </div>
                <div className='SAauctionDetailsDate'>
                  <p>{auctionDate}</p>
                  <p>{auctionTime}</p>
                </div>
              </div>
            </div>
        <div className="SAauctionButtons">
          <button className="SAgoButton" onClick={handleGoButtonClick}>바로가기</button>
          <button className="SAalertButton" onClick={handleAlertButtonClick}>알림신청</button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default SAitem;