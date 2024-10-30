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
        const response = await axios.post('http://localhost:8080/members/login', member,
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
        const response = await axios.get(`http://localhost:8080/members/logout`, {
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
            return thunkApi.rejectWithValue(e);
        }
    });


export const kakaoJwtToken = createAsyncThunk(
    'auth/kakaoJwtToken',
    async (code, thunkApi) => {
        try {
            const response = await axios.get(`http://localhost:8080/auth/kakao/callback`, {
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
            const response = await axios.get(`http://localhost:8080/auth/naver/callback`, {
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
            const response = await axios.post(`http://localhost:8080/auth/google/callback`, {
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
            const response = await axios.get(`http://localhost:8080/auth/checkLogin`, {
                withCredentials: true
            });

            return response.data;

        } catch (e) {
            console.log("오류 발생");
            return thunkApi.rejectWithValue(e);
        }
    });

    // 프로필 이미지 업로드 액션
    export const uploadProfileImage = createAsyncThunk(
        'members/uploadProfileImage',
        async (formData, thunkApi) => {
            try {
                const response = await axios.post('http://localhost:8080/mypage/profile-image', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                });

                return response.data.item; // 업로드된 프로필 이미지 정보를 반환
            } catch (e) {
                console.error("프로필 이미지 업로드 오류 발생:", e);
                return thunkApi.rejectWithValue(e.response.data); // 에러 발생 시 반환
            }
        }
    );

    // 충전 요청 액션
export const chargeAccount = createAsyncThunk(
    'account/chargeAccount',
    async (dummyData, thunkApi) => {
      try {
        const response = await axios.post('http://localhost:8080/account/charge', dummyData, {
          withCredentials: true
        });
        return response.data.item; // 충전 결과 반환
      } catch (e) {
        console.error("충전 요청 오류 발생:", e);
        return thunkApi.rejectWithValue(e.response ? e.response.data : e.message);
      }
    }
  );
  
  // 환전 요청 액션
  export const exchangeAccount = createAsyncThunk(
    'account/exchangeAccount',
    async (dummyData, thunkApi) => {
      try {
        const response = await axios.post('http://localhost:8080/account/exchange', dummyData, {
          withCredentials: true
        });
        return response.data.item; // 환전 결과 반환
      } catch (e) {
        console.error("환전 요청 오류 발생:", e);
        return thunkApi.rejectWithValue(e.response ? e.response.data : e.message);
      }
    }
  );
  
  // 구매 요청 액션
  export const buyAuction = createAsyncThunk(
    'account/buyAuction',
    async (dummyData, thunkApi) => {
      try {
        const response = await axios.post('http://localhost:8080/account/buy', dummyData, {
          withCredentials: true
        });
        return response.data.item; // 구매 결과 반환
      } catch (e) {
        console.error("구매 요청 오류 발생:", e);
        return thunkApi.rejectWithValue(e.response ? e.response.data : e.message);
      }
    }
  );
  
  // 판매 요청 액션
  export const sellAuction = createAsyncThunk(
    'account/sellAuction',
    async (dummyData, thunkApi) => {
      try {
        const response = await axios.post('http://localhost:8080/account/sell', dummyData, {
          withCredentials: true
        });
        return response.data.item; // 판매 결과 반환
      } catch (e) {
        console.error("판매 요청 오류 발생:", e);
        return thunkApi.rejectWithValue(e.response ? e.response.data : e.message);
      }
    }
  );

