import React from 'react';

const SaleConfirmationNotification = ({ notification }) => (
  <div>
    <p className="ALnotificationTitle">{notification.title}</p>
    <p>판매된 {notification.productName} 을/(를) 구매자가 수령하여 물품에 대한 금액이 정산처리 되었습니다.</p>
    <p>판매된 물품 금액 : {notification.price}</p>
    <p>{notification.timestamp}</p>
  </div>
);

export default SaleConfirmationNotification;
