import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const join = createAsyncThunk('members/join', async (member, thunkApi) => {
    try {
        const response = await axios.post('http://localhost:8080/members/join', member);

        return response.data.item;
    } catch (e) {
        return thunkApi.rejectWithValue(e);
    }
});

export const login = createAsyncThunk('members/login', async (member, thunkApi) => {
    try {
        const response = await axios.post('http://localhost:8080/members/login', member);

        return response.data.item;
    } catch (e) {
        return thunkApi.rejectWithValue(e);
    }
});

export const logout = createAsyncThunk('members/logout', async (_, thunkApi) => {
    try {
        const response = await axios.get(`http://localhost:8080/members/logout`);

        return response.data.item;
    } catch (e) {
        return thunkApi.rejectWithValue(e);
    }
});

export const findMember = createAsyncThunk(
    'members/mailSend',

    async (formData, thunkApi) => {

        try {
            const response = await axios.post(`http://localhost:8080/members/mailSend`, formData)

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
            const response = await axios.post(`http://localhost:8080/members/mailCheck`, {
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
            const response = await axios.post(`http://localhost:8080/members/findByEmail`, {
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
            const response = await axios.post(`http://localhost:8080/members/modifyPasswd`,
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
            console.log(formData);
            return thunkApi.rejectWithValue(e);
        }
    });






