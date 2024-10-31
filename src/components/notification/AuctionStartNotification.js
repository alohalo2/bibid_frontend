import React from 'react';

const AuctionStartNotification = ({ notification }) => (
  <div>
    <p className="ALnotificationTitle">{notification.title}</p>
    {/* <p>{notification.auctionType} {notification.productName} 이/(가) 경매 시작 30분 전 입니다.</p> */}
    <p>{notification.auctionType} {notification.productName} 이/(가) 경매 시작 10분 전 입니다.</p>
    <p>{notification.timestamp}</p>
  </div>
);

export default AuctionStartNotification;
