import React from 'react';

const AuctionSoldNotification = ({ notification }) => (
  <div>
    <p className="ALnotificationTitle">{notification.title}</p>
    <p>{notification.auctionType} {notification.productName} 이/(가) 낙찰되었습니다.</p>
    <p>낙찰자 : {notification.winnerNickname}</p>
    <p>낙찰 금액 : {notification.winningBid}</p>
    <p>{notification.timestamp}</p>
  </div>
);

export default AuctionSoldNotification;
