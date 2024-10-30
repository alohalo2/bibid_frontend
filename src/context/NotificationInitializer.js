import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setNotifications} from '../slices/notification/notificationSlice'
import axios from 'axios';
import useNotificationWebSocket from '../customHooks/useNotificationWebSocket';

// 알림 초기화 컴포넌트
const NotificationInitializer = () => {

    const memberIndex = useSelector((state) => state.memberSlice.memberIndex);
    const dispatch = useDispatch();

    useNotificationWebSocket();

    useEffect(() => {
        const fetchInitialNotifications = async () => {
            if (memberIndex !== 0) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/notifications/${memberIndex}`, {
                        withCredentials: true,
                    });
                    dispatch(setNotifications(response.data));
                } catch (error) {
                    console.error("Failed to fetch notifications:", error);
                }
            }
        };

        fetchInitialNotifications();
    }, [memberIndex, dispatch]);

    return null;
};

export default NotificationInitializer;
