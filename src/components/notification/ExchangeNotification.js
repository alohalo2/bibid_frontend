import React from 'react';

const ExchangeNotification = ({ notification }) => (
  <div>
    <p className="ALnotificationTitle">{notification.title}</p>
    <p>환전이 완료되었습니다.</p>
    <p>{notification.timestamp}</p>
  </div>
);

export default ExchangeNotification;
