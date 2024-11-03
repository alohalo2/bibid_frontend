import React from 'react';
import { useNavigate } from 'react-router-dom';

const HigherBidNotification = ({ notification }) => {

  const handleClick = () => {
    window.location.href = `${process.env.REACT_APP_FRONT_SERVER}/category-itemdetail/${notification.referenceIndex}` ;
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <p className="ALnotificationTitle" style={{ color: 'red' }}>
        {notification.title}
      </p>
      <p>{notification.content}</p>
      <p>
        {notification.auctionType} {notification.productName}에 입찰한 금액보다 상위 입찰자가 있습니다.
      </p>
      <p>상위 입찰 금액: {notification.higherBid} 원</p>
      <p>내 입찰 금액: {notification.myBid} 원</p>
      <p>{notification.timestamp}</p>
    </div>
  );
};

export default HigherBidNotification;
