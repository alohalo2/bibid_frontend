// NotificationInitializer.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotifications } from '../slices/notification/notificationSlice';
import axios from 'axios';

// 알림 초기화 컴포넌트
const NotificationInitializer = () => {
    const dispatch = useDispatch();
    const memberIndex = useSelector((state) => state.memberSlice.memberIndex);

    useEffect(() => {
        const fetchInitialNotifications = async () => {
            if (memberIndex !== 0) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/notifications/${memberIndex}`, {
                        withCredentials: true,
                    });
                    const notifications = response.data; // response.data로 바로 접근
                    dispatch(setNotifications(notifications));
                } catch (error) {
                    console.error("Failed to fetch notifications:", error);
                }
            }
        };

        fetchInitialNotifications();
    }, [dispatch, memberIndex]);

    return null; // UI를 렌더링하지 않음
};

export default NotificationInitializer;
