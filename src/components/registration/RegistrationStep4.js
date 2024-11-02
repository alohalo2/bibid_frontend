import React from 'react';
import {Container, Button, Typography, Grid2} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";

const RegistrationStep4 = ({ memberInfo }) => {

    const navi = useNavigate();

    const nickname = useSelector(state => state.memberSlice.nickname);


    return (

    <Container maxWidth="lg">

      <Grid2 container sx={{borderBottom:'3px solid black', my:'40px'}}>
              <Typography variant="h5" sx={{ fontWeight: 'bold'}}>4. 물품 등록 완료</Typography>
            </Grid2>

            <Grid2 container>

              {/* Success Message */}
              <Grid2 item size={12} sx={{textAlign:'center', fontWeight: 'bold', my: 2, fontSize:'2rem'}}>
                  물품 등록이 완료되었습니다.
              </Grid2>

              {/* Icon Section */}
              <Grid2 item size={12} sx={{textAlign:'center', my: 2}}>
                <img src='/images/registration_success_icon.svg' alt='Registration Success Icon'></img>
              </Grid2>

              {/* Subtext */}
              <Grid2 item size={12} sx={{textAlign:'center', fontWeight: 'bold', my: 2, fontSize:'1.2rem'}}>
                  {nickname}님의 물품이<br />
                  성공적으로 등록되었습니다.
              </Grid2>

              {/* Information and Links */}
              <Grid2 item size={12} sx={{textAlign:'center', fontWeight: 'bold', my: 2, fontSize:'1.2rem'}}>
                  * 물품등록 내역확인 및 삭제는 <span style={{ color: 'orange' }}>마이페이지</span> &gt; <span style={{ color: 'orange' }}>내가 등록한 경매</span> 에서 가능합니다.
              </Grid2>
            </Grid2>

            <Grid2 container justifyContent="center" alignItems="center" sx={{ mt:10, mb : 10, gap: '20px' }}>
              {/* 이전 단계 버튼 */}
              <Grid2 item>
                  <Button
                  variant="contained"
                  sx={{ width: '12rem', backgroundColor: '#D9D9D9', fontFamily: 'Inter', color: 'black', fontWeight: 'bold', fontSize: '1rem', textAlign: 'center', transition: 'all 0.3s ease-in-out','&:hover': {backgroundColor: '#0A369D', color: 'white'}}}
                  onClick={() => (window.location.href = ("/mypage/auctionmanagement"))}
                  >
                  물품 등록 내역 보기
                  </Button>
              </Grid2>

              {/* 다음 단계 버튼 */}
              <Grid2 item>
                  <Button
                  variant="contained"
                  sx={{ width: '8rem', backgroundColor: '#D9D9D9', color: 'black', fontWeight: 'bold', fontSize: '1rem', textAlign: 'center', transition: 'all 0.3s ease-in-out','&:hover': {backgroundColor: '#0A369D', color: 'white'} }}
                  onClick={() => (window.location.href = ("/"))}
                  >
                  메인 페이지
                  </Button>
              </Grid2>
            </Grid2>

    </Container>
  )
}

export default RegistrationStep4