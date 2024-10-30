import React from 'react';

const DepositNotification = ({ notification }) => (
  <div>
    <p className="ALnotificationTitle">{notification.title}</p>
    <p>충전이 완료되었습니다.</p>
    <p>{notification.timestamp}</p>
  </div>
);

export default DepositNotification;
