import React from "react";
import "./KakaoLogin.css"
import styled from "styled-components";

const CenteredContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

function KakaoLogin() {

    return (
        <CenteredContainer>
            <div className="loader"></div>
        </CenteredContainer>

)
}

export default KakaoLogin;