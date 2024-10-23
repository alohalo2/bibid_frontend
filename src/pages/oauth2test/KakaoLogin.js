import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useRecoilState} from "recoil";
import {userInfoState} from './userInfoState';

function KakaoLogin() {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const navigate = useNavigate();
    const PARAMS = new URL(document.location).searchParams;
    const KAKAO_CODE = PARAMS.get("code");
    const [accessTokenFetching, setAccessTokenFetching] = useState(false);

    console.log("KAKAO_CODE:", KAKAO_CODE);

    // Access Token 받아오기
    const getAccessToken = async () => {
        if (accessTokenFetching) return; // Return early if fetching

        console.log("getAccessToken 호출");

        try {
            setAccessTokenFetching(true); // Set fetching to true

            const response = await axios.post(
                "~~~/api/auth/kakao",
                {
                    authorizationCode: KAKAO_CODE,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const accessToken = response.data.accessToken;
            console.log("accessToken:", accessToken);

            setUserInfo({
                ...userInfo,
                accessToken: accessToken,
            });

            setAccessTokenFetching(false); // Reset fetching to false
            getProfile();
        } catch (error) {
            console.error("Error:", error);
            setAccessTokenFetching(false); // Reset fetching even in case of error
        }
    };

    const getProfile = async () => {
        try {
            console.log("getProfile 호출");
            // Check if accessToken is available
            if (userInfo.accessToken) {
                console.log("accessToken in getProfile:", userInfo.accessToken);
                const response = await axios.get(
                    "~~~/users/profile",
                    {
                        headers: {
                            Authorization: `${userInfo.accessToken}`,
                        },
                    }
                );
                console.log("message:", response.data.message);
                setUserInfo({
                    ...userInfo,
                    id: response.data.result.id,
                    name: response.data.result.name,
                    email: response.data.result.email,
                    nickname: response.data.result.nickname,
                    profileImage: response.data.result.profile_image_url,
                    isLogin: true,
                });
                navigate("/");
            } else {
                console.log("No accessToken available");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        if (KAKAO_CODE && !userInfo.accessToken) {
            getAccessToken();
        }
    }, [KAKAO_CODE, userInfo]);

    useEffect(() => {
        if (userInfo.accessToken) {
            getProfile();
        }
    }, [userInfo]);

    return (
        <div className="LoginHandeler">
            <div className="notice">
                <p>로그인 중입니다.</p>
                <p>잠시만 기다려주세요.</p>
                <div className="spinner"></div>
            </div>
        </div>    );
}

export default KakaoLogin;