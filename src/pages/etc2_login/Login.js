import React, {useState, useCallback, useEffect} from 'react';
import {
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Icon,
    InputAdornment,
    TextField,
    Typography
} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../apis/etc2_memberapis/memberApis';
import {useNavigate} from 'react-router-dom';
import styled from "styled-components";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import '../../css/Login.css';
import {keep_Login} from '../../slices/etc2_memberslice/memberSlice';


const LoginBlock = styled.div`
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

const Login = () => {

    const [loginForm, setLoginForm] = useState({
        memberId: '',
        memberPw: ''
    });
    const [showMemberPw, setShowMemberPw] = useState(false);

    const isLogin = useSelector(state => state.memberSlice.isLogin);

    const dispatch = useDispatch();
    const navi = useNavigate();

    const changeTextField = useCallback((e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        });
    }, [loginForm]);

    const handleLogin = useCallback((e) => {
        e.preventDefault();

        dispatch(login(loginForm)).then((action) => {
            if (login.fulfilled.match(action)) { // 액션 타입 확인을 위해 match 사용
                if (isLogin) {
                    localStorage.setItem('isLogin', 'true');
                }
                navi("/");
            } else {
                console.error('로그인 실패');
            }
        });

    }, [loginForm, dispatch, navi, isLogin]);

    const toggleShowMemberPw = () => {
        setShowMemberPw((prev) => !prev);
    };

    const [isChecked, setIsChecked] = useState(false);

    const handleKeepLogin = useCallback((e) => {
        const checked = e.target.checked;
        setIsChecked(checked);
        dispatch(keep_Login(checked));
        console.log(checked)
        console.log(dispatch(keep_Login(checked)))
    }, [dispatch, isChecked]);

    return (
        <CenteredContainer>
            <LoginBlock>
                <form onSubmit={handleLogin}>
                    <Container maxWidth="sm" sx={{mt: 5}}>
                        <HeaderTitle>로그인</HeaderTitle>
                        <Grid item xs={12} textAlign='right' style={{marginBottom: "15px"}}>
                            <TextField
                                name='memberId'
                                variant='outlined'
                                required
                                id='memberId'
                                label='아이디'
                                autoFocus
                                fullWidth
                                value={loginForm.memberId}
                                onChange={changeTextField}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name='memberPw'
                                variant='outlined'
                                required
                                id='memberPw'
                                label='비밀번호'
                                fullWidth
                                type={showMemberPw ? "text" : "password"} // 비밀번호 가시성 토글
                                value={loginForm.memberPw}
                                onChange={changeTextField}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button onClick={toggleShowMemberPw}>
                                                {showMemberPw ? <VisibilityOff/> : <Visibility/>}
                                            </Button>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isChecked}
                                        onChange={handleKeepLogin}
                                    />
                                }
                                label="로그인 상태 유지"
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                type="submit" // type을 submit으로 설정
                                style={{margin: '10px 0', backgroundColor: "#2196F3", height: "43px", fontSize: "18px"}}
                                fullWidth
                            >
                                로그인
                            </Button>
                        </Grid>
                        <Grid className="joinFindContainer">
                            <a href={"/join"} className="joinFindButton">회원가입</a>
                            <div className="vertical-line"></div>
                            <a href={"/find"} className="joinFindButton">계정찾기</a>
                        </Grid>
                        <Grid container justifyContent="center" alignItems="center"
                              style={{marginTop: '40px', borderTop: '1px solid #FFFFFF'}}>
                            <Typography style={{margin: '20px 0', color: '#FFF'}}>
                                소셜로 로그인
                            </Typography>
                        </Grid>
                        <Grid container justifyContent="center" alignItems="center">
                            <div className="circle">
                                <img src="/images/logo/kakao.png" alt="샘플 이미지"/>
                            </div>
                            <div className="circle">
                                <img src="/images/logo/naver.png" alt="샘플 이미지"/>
                            </div>
                            <div className="circle">
                                <img src="/images/logo/google.png" alt="샘플 이미지"/>
                            </div>
                            <div className="circle">
                                <img src="/images/logo/apple.png" alt="샘플 이미지"/>
                            </div>
                        </Grid>
                    </Container>
                </form>
            </LoginBlock>
        </CenteredContainer>


    )
        ;
};

export default Login;