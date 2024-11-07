import React from 'react';

const DirectMessageNotification = ({ notification }) => (
  <div>
    <p className="ALnotificationTitle">{notification.title}</p>
    <p>일대일 메시지가 도착했습니다.</p>
    <p>{notification.timestamp}</p>
  </div>
);

export default DirectMessageNotification;
