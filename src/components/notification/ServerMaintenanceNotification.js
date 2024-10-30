import React from 'react';

const ServerMaintenanceNotification = ({ notification }) => (
  <div>
    <p className="ALnotificationTitle">{notification.title}</p>
    <p>서버 점검 공지: 점검 시간 동안 이용이 제한될 수 있습니다.</p>
    <p>{notification.timestamp}</p>
  </div>
);

export default ServerMaintenanceNotification;
