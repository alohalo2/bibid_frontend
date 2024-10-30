import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        notifications: [],
    },
    reducers: {
        setNotifications: (state, action) => {
            state.notifications = action.payload;
        },
        addNotification: (state, action) => {
            state.notifications.push(action.payload);
        },
        clearNotifications: (state) => {
            state.notifications = [];
        }
    },
});

export const { setNotifications, addNotification, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
