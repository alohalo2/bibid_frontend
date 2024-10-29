import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const join = createAsyncThunk('members/join', async (member, thunkApi) => {
    try {
        const response = await axios.post('http://223.130.162.136:8080/members/join', member);

        return response.data.item;
    } catch (e) {
        return thunkApi.rejectWithValue(e);
    }
});

export const login = createAsyncThunk('members/login', async (member, thunkApi) => {
    try {
        const response = await axios.post('http://223.130.162.136:8080/members/login', member,
            {
                withCredentials: true
            });

        return response.data.item;
    } catch (e) {
        return thunkApi.rejectWithValue(e);
    }
});

export const logout = createAsyncThunk('members/logout', async (_, thunkApi) => {
    try {
        const response = await axios.get(`http://223.130.162.136:8080/members/logout`, {
            withCredentials: true
        });

        return response.data.item;
    } catch (e) {
        return thunkApi.rejectWithValue(e);
    }
});

export const findMember = createAsyncThunk(
    'members/mailSend',

    async (formData, thunkApi) => {

        try {
            const response = await axios.post(`http://223.130.162.136:8080/members/mailSend`, formData)

            return formData.email;
        } catch (e) {
            console.log("오류 발생");
            return thunkApi.rejectWithValue(e);
        }
    });

export const verificationCodeCheck = createAsyncThunk(
    'members/mailCheck',

    async (formData, thunkApi) => {

        try {
            const response = await axios.post(`http://223.130.162.136:8080/members/mailCheck`, {
                verificationCode: formData.verificationCode
            });

            console.log(formData.verificationCode);

            return response.data;

        } catch (e) {
            console.log("오류 발생");
            console.log(formData);
            return thunkApi.rejectWithValue(e);
        }
    });

export const findIdByEmail = createAsyncThunk(
    'members/findByEmail',

    async (formData, thunkApi) => {

        try {
            const response = await axios.post(`http://223.130.162.136:8080/members/findByEmail`, {
                email: formData.email
            });

            return response.data;

        } catch (e) {
            console.log("오류 발생");
            console.log(formData);
            return thunkApi.rejectWithValue(e);
        }
    });

export const modifyPasswd = createAsyncThunk(
    'members/modifyPasswd',

    async (formData, thunkApi) => {

        try {
            const response = await axios.post(`http://223.130.162.136:8080/members/modifyPasswd`,
                null,
                {
                    params: {
                        newPasswd: formData.memberPw
                    }
                }
            );

            return response.data;

        } catch (e) {
            console.log("오류 발생");
            return thunkApi.rejectWithValue(e);
        }
    });


export const kakaoJwtToken = createAsyncThunk(
    'auth/kakaoJwtToken',
    async (code, thunkApi) => {
        try {
            const response = await axios.get(`http://223.130.162.136:8080/auth/kakao/callback`, {
                params: {
                    code: code // 쿼리 파라미터로 코드 전달
                },
                withCredentials: true
            });

            return response.data.item; // 성공적으로 가져온 JWT 반환

        } catch (e) {
            console.log("오류 발생");
            return thunkApi.rejectWithValue(e);
        }
    });

export const naverJwtToken = createAsyncThunk(
    'auth/naverJwtToken',
    async (code, thunkApi) => {
        try {
            const response = await axios.get(`http://223.130.162.136:8080/auth/naver/callback`, {
                params: {
                    code: code // 쿼리 파라미터로 코드 전달
                },
                withCredentials: true
            });

            return response.data.item; // 성공적으로 가져온 JWT 반환

        } catch (e) {
            console.log("오류 발생");
            return thunkApi.rejectWithValue(e);
        }
    });

export const googleJwtToken = createAsyncThunk(
    'auth/googleJwtToken',
    async (accessToken, thunkApi) => {
        try {
            const response = await axios.post(`http://223.130.162.136:8080/auth/google/callback`, {
                access_token: accessToken // 액세스 토큰을 JSON 바디로 전송
            }, {
                withCredentials: true
            });

            return response.data.item; // 성공적으로 가져온 JWT 반환

        } catch (e) {
            console.log("오류 발생:", e);
            return thunkApi.rejectWithValue(e.response.data); // 에러 메시지를 반환
        }
    }
);

export const checkLogin = createAsyncThunk(
    'auth/checkLogin',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`http://223.130.162.136:8080/auth/checkLogin`, {
                withCredentials: true
            });

            return response.data;

        } catch (e) {
            console.log("오류 발생");
            return thunkApi.rejectWithValue(e);
        }
    });