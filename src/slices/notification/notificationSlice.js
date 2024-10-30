import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        items: [],
    },
    reducers: {
        addNotification: (state, action) => {
            console.log(action.payload);
            state.items.push(action.payload);
        },
        setNotifications: (state, action) => {
            state.items = action.payload;
        },
    },
});

export const { addNotification, setNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
