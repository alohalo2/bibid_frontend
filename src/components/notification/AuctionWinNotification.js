import React from 'react';

const AuctionWinNotification = ({ notification }) => (
  <div>
    <p className="ALnotificationTitle">{notification.title}</p>
    <p>{notification.auctionType} {notification.productName} 이/(가) 낙찰되었습니다.</p>
    <p>{notification.timestamp}</p>
  </div>
);

export default AuctionWinNotification;
