import React, { useContext } from 'react';
import { NotificationContext } from '../../context/NotificationContext';
function NotificationList() {
    const { notifications } = useContext(NotificationContext);

    return (
        <div>
            <h3>Notifications</h3>
            <ul>
                {notifications.map((notif, index) => (
                    <li key={index}>
                        <strong>{notif.title}</strong>: {notif.content}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NotificationList;
