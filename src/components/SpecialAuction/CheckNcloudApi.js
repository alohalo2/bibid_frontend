import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid2 } from '@mui/material';
import axios from 'axios';

const CheckNcloudApi = () => {

  const [formData, setFormData] = useState({
    secretKey: '',
    accessKey: '',
    apiUrl: '',
    method: '',
    requestBody: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACK_SERVER}/api/ncloud/check`, {
        secretKey: formData.secretKey,
        accessKey: formData.accessKey,
        apiUrl: formData.apiUrl,
        method: formData.method,
        requestBody: formData.requestBody
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // 백엔드에서 받은 응답을 처리
      console.log('백엔드 응답:', response.data);
      alert('API 호출 성공');
    } catch (error) {
      console.error('API 호출 오류:', error);
      alert('API 호출 실패');
    }
  };

  return (
    <Container maxWidth="lg">
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', my: 4 }}>Ncloud API 체크</Typography>

        <Grid2 container>
          <Grid2 size={2.5} sx={{ textAlign: 'center', backgroundColor: '#E7E9FF', height: '65px', lineHeight: '65px', fontWeight: 'bold', border: '1px solid #7B7B7B' }}>
            시크릿키
          </Grid2>
          <Grid2 size={9.5} sx={{ display: 'flex', alignItems: 'center', height: '65px', border: '1px solid #7B7B7B', paddingLeft: '10px' }}>
            <TextField
              value={formData.secretKey}
              onChange={(e) => setFormData({ ...formData, secretKey: e.target.value })}
              variant="outlined"
              placeholder="시크릿키를 입력하세요."
              size="small"
              sx={{ width: '50%', '& .MuiOutlinedInput-root': { fontWeight: 'bold' } }}
            />
          </Grid2>
        </Grid2>

        <Grid2 container>
          <Grid2 size={2.5} sx={{ textAlign: 'center', backgroundColor: '#E7E9FF', height: '65px', lineHeight: '65px', fontWeight: 'bold', border: '1px solid #7B7B7B' }}>
            액세스키
          </Grid2>
          <Grid2 size={9.5} sx={{ display: 'flex', alignItems: 'center', height: '65px', border: '1px solid #7B7B7B', paddingLeft: '10px' }}>
            <TextField
              value={formData.accessKey}
              onChange={(e) => setFormData({ ...formData, accessKey: e.target.value })}
              variant="outlined"
              placeholder="액세스키를 입력하세요."
              size="small"
              sx={{ width: '50%', '& .MuiOutlinedInput-root': { fontWeight: 'bold' } }}
            />
          </Grid2>
        </Grid2>

        <Grid2 container>
          <Grid2 size={2.5} sx={{ textAlign: 'center', backgroundColor: '#E7E9FF', height: '65px', lineHeight: '65px', fontWeight: 'bold', border: '1px solid #7B7B7B' }}>
            API URL
          </Grid2>
          <Grid2 size={9.5} sx={{ display: 'flex', alignItems: 'center', height: '65px', border: '1px solid #7B7B7B', paddingLeft: '10px' }}>
            <TextField
              value={formData.apiUrl}
              onChange={(e) => setFormData({ ...formData, apiUrl: e.target.value })}
              variant="outlined"
              placeholder="API URL을 입력하세요."
              size="small"
              sx={{ width: '50%', '& .MuiOutlinedInput-root': { fontWeight: 'bold' } }}
            />
          </Grid2>
        </Grid2>

        <Grid2 container>
          <Grid2 size={2.5} sx={{ textAlign: 'center', backgroundColor: '#E7E9FF', height: '65px', lineHeight: '65px', fontWeight: 'bold', border: '1px solid #7B7B7B' }}>
            요청 바디 (옵션, JSON 형태로)
          </Grid2>
          <Grid2 size={9.5} sx={{ display: 'flex', alignItems: 'center', height: '65px', border: '1px solid #7B7B7B', paddingLeft: '10px' }}>
            <TextField
              value={formData.requestBody}
              onChange={(e) => setFormData({ ...formData, requestBody: e.target.value })}
              variant="outlined"
              placeholder="요청 바디를 입력하세요 (선택 사항)."
              size="small"
              sx={{ width: '50%', '& .MuiOutlinedInput-root': { fontWeight: 'bold' } }}
            />
          </Grid2>
        </Grid2>

        <Grid2 container>
          <Grid2 size={2.5} sx={{ textAlign: 'center', backgroundColor: '#E7E9FF', height: '65px', lineHeight: '65px', fontWeight: 'bold', border: '1px solid #7B7B7B' }}>
            메소드
          </Grid2>
          <Grid2 size={9.5} sx={{ display: 'flex', alignItems: 'center', height: '65px', border: '1px solid #7B7B7B', paddingLeft: '10px' }}>
            <TextField
              value={formData.method}
              onChange={(e) => setFormData({ ...formData, method: e.target.value })}
              variant="outlined"
              placeholder="메소드를 입력하세요 (선택 사항)."
              size="small"
              sx={{ width: '50%', '& .MuiOutlinedInput-root': { fontWeight: 'bold' } }}
            />
          </Grid2>
        </Grid2>

        {/* Next Button */}
        <Grid2 container justifyContent="center" sx={{ mt: 2 }}>
          <Button
            variant="contained"
            sx={{ width: '8rem', backgroundColor: '#D9D9D9', color: 'black', fontWeight: 'bold', fontSize: '1rem' }}
            type="submit"
          >
            체크
          </Button>
        </Grid2>
      </form>
    </Container>
  );
};

export default CheckNcloudApi;
