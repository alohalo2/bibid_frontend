// NotificationInitializer.js
import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { NotificationContext } from './NotificationContext';

// 알림 초기화 컴포넌트
const NotificationInitializer = () => {
    const memberIndex = useSelector((state) => state.memberSlice.memberIndex);
    const { setNotifications } = useContext(NotificationContext); // Context에서 setNotifications 가져오기

    useEffect(() => {
        const fetchInitialNotifications = async () => {
            if (memberIndex !== 0) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/notifications/${memberIndex}`, {
                        withCredentials: true,
                    });
                    const notifications = response.data;
                    setNotifications(notifications); // 초기 알림 데이터를 설정
                } catch (error) {
                    console.error("Failed to fetch notifications:", error);
                }
            }
        };

        fetchInitialNotifications();
    }, [memberIndex, setNotifications]);

    return null; // UI 요소를 렌더링하지 않음
};

export default NotificationInitializer;
