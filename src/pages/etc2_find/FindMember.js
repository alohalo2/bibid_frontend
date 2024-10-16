import React, {useCallback, useState} from 'react';
import {Button, Container, Grid, InputAdornment, Menu, MenuItem, TextField, Typography} from "@mui/material";
import '../../css/Login.css';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchMemberId, findMember, verificationCodeCheck} from "../../apis/etc2_memberapis/memberApis";

const FindBlock = styled.div`
    display: flex;
    width: 25rem;
    border-radius: 10px;
    background-color: #bfbfbf;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

const CenteredContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

const HeaderTitle = styled.div`
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
`

const FindMember = () => {

        const navi = useNavigate();
        const dispatch = useDispatch();

        const [findForm, setFindForm] = useState({
            email: ''
        });
        const [codeForm, setCodeForm] = useState({
            verificationCode: ''
        });
        const [emailError, setEmailError] = useState('');
        const [isButtonVisible, setIsButtonVisible] = useState(false);
        const [verificationButtonVisible, setVerificationButtonVisible] = useState(false);


        const handleFind = useCallback((e) => {
            e.preventDefault();
            console.log(findForm); // findForm의 값을 확인

            dispatch(findMember(findForm));


        }, [findForm, dispatch]);

        const changeTextField = useCallback((e) => {
            setFindForm(prevForm => {
                const updatedForm = {
                    ...prevForm,
                    [e.target.name]: e.target.value
                };

                const email = updatedForm.email; // 업데이트된 form에서 email 가져오기
                const isValidEmail = validateEmail(email);
                setIsButtonVisible(isValidEmail);

                return updatedForm; // 업데이트된 form 반환
            });

            setCodeForm({
                ...codeForm,
                [e.target.name]: e.target.value
            });

        }, [findForm, codeForm]);

        const emailRegex = /^(?=.*@)(?=.*\.).+$/;

        const validateEmail = (email) => {
            if (email.trim() === '') {
                setEmailError('이메일 주소를 입력해주세요.');
                return false;
            } else if (!emailRegex.test(email)) {
                setEmailError('올바른 이메일 형식이 아닙니다.');
                return false;
            } else {
                setEmailError('');
                return true;
            }
        };

        const handleVerification = useCallback(async (e) => {
            e.preventDefault();

            try {
                const result = await dispatch(verificationCodeCheck(codeForm));
                console.log(result);

                if (result.payload) {
                    alert("인증을 성공하였습니다");
                } else {
                    alert("인증번호가 틀렸습니다. 다시 입력해주세요.");
                }
            } catch (error) {
                console.error("데이터를 가져오는 중 오류 발생:", error);
            }

        }, [codeForm, dispatch]);

        return (
            <CenteredContainer>
                <FindBlock>
                    <HeaderTitle>계정 찾기</HeaderTitle>
                    <Container sx={{mt: 5, width: '100%'}}>
                        <form onSubmit={handleFind}>

                            <Grid item xs={12} textAlign='right' style={{marginBottom: "15px"}}>
                                <TextField
                                    label="이메일"
                                    name="email"
                                    required
                                    value={findForm.email}
                                    onChange={changeTextField}
                                    error={!!emailError}
                                    fullWidth
                                />
                            </Grid>
                            {emailError && (
                                <Typography
                                    component='p'
                                    variant='string'
                                    style={{color: 'red', marginTop: '0.5rem', marginLeft: '1.05rem'}}
                                >
                                    {emailError}
                                </Typography>
                            )}
                            {isButtonVisible && ( // 버튼 표시 조건 추가
                                <Button
                                    name="transport-button"
                                    variant="contained"
                                    type="submit"
                                    style={{
                                        margin: '10px 0',
                                        backgroundColor: "#2196F3",
                                        height: "43px",
                                        fontSize: "18px"
                                    }}
                                    fullWidth
                                >
                                    인증번호 전송
                                </Button>
                            )}
                        </form>
                    </Container>
                    <Container sx={{mt: 5, width: '100%'}}>
                        <form onSubmit={handleVerification}>
                            <Grid item xs={12} style={{display: 'flex', alignItems: 'center'}}>
                                <TextField
                                    label="인증번호"
                                    name="verificationCode"
                                    required
                                    fullWidth
                                    value={codeForm.verificationCode}
                                    onChange={changeTextField}
                                    // error={!!codeError}
                                    style={{flex: 1}} // 텍스트 필드가 남은 공간을 차지하도록 설정
                                />
                            </Grid>
                            {/*{verificationButtonVisible && ( // 버튼 표시 조건 추가*/}
                            <Button
                                name="transport-button"
                                variant="contained"
                                type="submit"
                                style={{
                                    margin: '10px 0',
                                    backgroundColor: "#2196F3",
                                    height: "43px",
                                    fontSize: "18px"
                                }}
                                fullWidth
                            >
                                인증번호 전송
                            </Button>
                        </form>
                    </Container>
                </FindBlock>
            </CenteredContainer>

        );
    }
;

export default FindMember;