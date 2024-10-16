import {Container, Typography, Button} from '@mui/material';
import styled from "styled-components";
import Circle from "../../components/etc2_join/Circle";
import {useDispatch, useSelector} from "react-redux";
import {fetchMemberId} from "../../apis/etc2_memberapis/memberApis";
import {useEffect, useState} from "react";

const JoinBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1200px;
    margin: 0 auto;
    height: 100vh;
    position: relative;
`;


const JoinThree = () => {

        const [activeStep, setActiveStep] = useState(2);
        const memberId = useSelector((state) => state.memberSlice.memberId);

        const dispatch = useDispatch();

        return (
            <JoinBlock>
                <Circle activeStep={activeStep}
                        style={{position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)'}}/>
                <Container maxWidth="sm" sx={{textAlign: 'center', mt: 5}}>
                    <Typography variant="h4" sx={{mt: 2, mb: 1}}>
                        회원가입 완료
                    </Typography>
                    <Typography variant="body1" sx={{mb: 2}}>
                        {memberId}님의 회원가입이 성공적으로 완료되었습니다.
                    </Typography>
                    <Typography variant="body2" sx={{mb: 4}}>
                        * 회원가입 내역확인 및 수정은 마이페이지 &gt; 회원정보수정 에서 가능합니다.
                    </Typography>
                    <Button variant="contained" color="primary" href="/login">
                        로그인
                    </Button>
                </Container>
            </JoinBlock>
        );
    }
;

export default JoinThree;