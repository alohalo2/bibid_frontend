import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
// import axios from "axios";
// import {useRecoilState} from "recoil";
// import {userInfoState} from './userInfoState';
import "./KakaoLogin.css"
import {useDispatch, useSelector} from "react-redux";
import {naverJwtToken} from "../../apis/etc2_memberapis/memberApis";
import styled from "styled-components";

const CenteredContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

function NaverLogin() {

    const dispatch = useDispatch();
    const navi = useNavigate();
    const jwtToken = useSelector(state => state.memberSlice.token);

    // Access Token 받아오기
    useEffect(() => {
        // URL에서 'code' 파라미터를 추출
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        console.log(code);
        if (code) {
            // 백엔드로 인가 코드 전송
            dispatch(naverJwtToken(code));
        }

    }, [dispatch]);

    return (
        <CenteredContainer>
            <div className="loader"></div>
        </CenteredContainer>
    )
}

export default NaverLogin;