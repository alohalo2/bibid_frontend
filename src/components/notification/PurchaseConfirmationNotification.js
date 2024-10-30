import React from 'react';

const PurchaseConfirmationNotification = ({ notification }) => (
  <div>
    <p className="ALnotificationTitle">{notification.title}</p>
    <p>구매한 {notification.productName} 에 대한 물품 수령 확인이 되어 물품 금액이 정산처리 되었습니다.</p>
    <p>구매한 물품 금액 : {notification.price}</p>
    <p>{notification.timestamp}</p>
  </div>
);

export default PurchaseConfirmationNotification;
