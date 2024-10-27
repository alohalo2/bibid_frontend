import {createSlice} from '@reduxjs/toolkit';
import {
    findIdByEmail,
    findMember, getAccessToken,
    join, kakaoJwtToken,
    login,
    logout, modifyPasswd, naverJwtToken, oauthLogin,
    verificationCodeCheck
} from '../../apis/etc2_memberapis/memberApis';

const memberSlice = createSlice({
    name: 'members',
    initialState: {
        memberIndex: 0,
        memberId: '',
        nickname: '',
        email: '',
        verificationCode: '',
        token: '',
        keepLogin: false,
        memberPw: '',
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(join.fulfilled, (state, action) => {
            alert(`${action.payload.memberId}님 가입 축하드립니다.`);
            return state;
        });
        builder.addCase(join.rejected, (state, action) => {
            alert('에러가 발생했습니다.');
            return state;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            alert(`${action.payload.memberId}님 환영합니다.`);

            return {
                ...state,
                memberIndex: action.payload.memberIndex,
                memberId: action.payload.memberId,
                nickname: action.payload.nickname,
                token: action.payload.token
            };
        });
        builder.addCase(login.rejected, (state, action) => {
            if (action.payload.response.data.statusMessage === 'memberId not exist') {
                alert("존재하지 않는 아이디입니다.");
                return state;
            }

            if (action.payload.response.data.statusMessage === 'wrong memberPw') {
                alert("잘못된 비밀번호입니다.");
                return state;
            }
            return state;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            alert("로그아웃 완료.");

            return {
                ...state,
                memberIndex: 0,
                nickname: '',
                token: '',
            }
        });
        builder.addCase(logout.rejected, (state, action) => {
            alert("에러가 발생했습니다.");
            return state;
        });
        builder.addCase(findMember.fulfilled, (state, action) => {

            return {
                ...state,
                email: action.payload
            }
        });
        builder.addCase(findMember.rejected, (state, action) => {
            alert("에러가 발생했습니다.");
            return state;
        });
        builder.addCase(verificationCodeCheck.fulfilled, (state, action) => {

            return {
                ...state,
                verificationCode: action.payload
            }
        });
        builder.addCase(verificationCodeCheck.rejected, (state, action) => {
            alert("에러가 발생했습니다.");
            return state;
        });
        builder.addCase(findIdByEmail.fulfilled, (state, action) => {

            return {
                ...state,
                memberId: action.payload.item
            }
        });
        builder.addCase(findIdByEmail.rejected, (state, action) => {
            alert("에러가 발생했습니다.");
            return state;
        });
        builder.addCase(modifyPasswd.fulfilled, (state, action) => {

            return {
                ...state,
                memberPw: action.payload.item
            }
        });
        builder.addCase(modifyPasswd.rejected, (state, action) => {
            alert("에러가 발생했습니다.");
            return state;
        });
        builder.addCase(kakaoJwtToken.fulfilled, (state, action) => {

            return {
                ...state,
                token: action.payload
            }
        });
        builder.addCase(kakaoJwtToken.rejected, (state, action) => {
            alert("에러가 발생했습니다.");
            return state;
        });
        builder.addCase(naverJwtToken.fulfilled, (state, action) => {

            return {
                ...state
            }
        });
        builder.addCase(naverJwtToken.rejected, (state, action) => {
            alert("에러가 발생했습니다.");
            return state;
        });
        builder.addCase(getAccessToken.fulfilled, (state, action) => {

            return{
                ...state,
                token: action.payload
            }

        })
        builder.addCase(getAccessToken.rejected, (state,action) => {
            alert("에러가 발생했습니다.");
            return state;
        })
    }
});

export default memberSlice.reducer;