import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import alarmIcon from '../../images/alarm.svg';
import alarmActiveIcon from '../../images/alarm_active_Icon.svg';
import '../../css/Layout/Alarm.css';

const Alarm = () => {
  const notifications = useSelector((state) => state.notificationSlice.notifications); // Redux의 notifications 가져오기
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedTab, setSelectedTab] = useState('전체');
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const currentIcon = notifications.length > 0 ? alarmActiveIcon : alarmIcon;

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showNotifications &&
        !event.target.closest('.ALnotificationBox') &&
        !event.target.closest('.HDnavbarAlarm')
      ) {
        setShowNotifications(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [showNotifications]);

  const handleItemClick = (link) => {
    navigate(link);
  };

  return (
    <div className="HDnavbarAlarmWrapper">
      <div className="HDnavbarAlarm" onClick={handleNotificationClick}>
        <img src={currentIcon} alt="alarm" />
      </div>

      {showNotifications && (
        <div className="ALnotificationBox">
          <div className="ALnotificationHeader">
            <h2>알림</h2>
          </div>
          <div className="ALnotificationContents">
            <div className="ALnotificationTabs">
              {['전체', '충전', '환전', '구매내역', '판매내역'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={selectedTab === tab ? 'activeTab' : ''}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="ALnotificationList">
              {notifications.map((notification, index) => (
                <div
                  className="ALnotificationItem"
                  key={index}
                  onClick={() => handleItemClick(notification.link)}
                >
                  {notification.notificationType === 'HIGHER_BID' ? (
                    <div>
                      <p className="ALnotificationTitle" style={{ color: 'red' }}>
                        {notification.title}
                      </p>
                      <p>{notification.content}</p>
                      <p>상위 입찰 금액: {notification.higherBid} 원</p>
                      <p>내 입찰 금액: {notification.myBid} 원</p>
                      <p>{notification.timestamp}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="ALnotificationTitle">{notification.title}</p>
                      <p>{notification.content}</p>
                      <p>{notification.timestamp}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alarm;
