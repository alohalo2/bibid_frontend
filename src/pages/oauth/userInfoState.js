import { atom } from 'recoil';

export const userInfoState = atom({
    key: 'userInfoState', // 고유한 ID
    default: {
        name: '',
        email: '',
    },
});