import React from 'react';
import { Container, Button, Typography, Grid } from '@mui/material';
import {
  confirmWidgetPayment,
  confirmPayment,
  confirmBrandPay,
  getBrandPayAccessToken,
  issueBillingKey,
  confirmBillingPayment,
} from '../../apis/toss/paymentApi'; // paymentApi.js 파일에서 함수들을 import하세요.

const TestApi = () => {
  // 각 버튼에서 호출될 API 함수들
  const handleConfirmWidgetPayment = async () => {
    try {
      const response = await confirmWidgetPayment({
        paymentKey: "dummyPaymentKeyWidget",
        orderId: "orderIdWidget12345",
        amount: 10000,
      });
      console.log('confirmWidgetPayment 응답:', response);
      alert('confirmWidgetPayment 호출 성공');
    } catch (error) {
      console.error('confirmWidgetPayment 호출 오류:', error);
      alert('confirmWidgetPayment 호출 실패');
    }
  };

  const handleConfirmPayment = async () => {
    try {
      const response = await confirmPayment({
        paymentKey: "dummyPaymentKeyPayment",
        orderId: "orderIdPayment12345",
        amount: 20000,
      });
      console.log('confirmPayment 응답:', response);
      alert('confirmPayment 호출 성공');
    } catch (error) {
      console.error('confirmPayment 호출 오류:', error);
      alert('confirmPayment 호출 실패');
    }
  };

  const handleConfirmBrandPay = async () => {
    try {
      const response = await confirmBrandPay({
        paymentKey: "dummyPaymentKeyBrandPay",
        orderId: "orderIdBrandPay12345",
        amount: 30000,
        customerKey: "dummyCustomerKey",
      });
      console.log('confirmBrandPay 응답:', response);
      alert('confirmBrandPay 호출 성공');
    } catch (error) {
      console.error('confirmBrandPay 호출 오류:', error);
      alert('confirmBrandPay 호출 실패');
    }
  };

  const handleGetBrandPayAccessToken = async () => {
    try {
      const response = await getBrandPayAccessToken({
        customerKey: "dummyCustomerKey",
        code: "dummyCode",
      });
      console.log('getBrandPayAccessToken 응답:', response);
      alert('getBrandPayAccessToken 호출 성공');
    } catch (error) {
      console.error('getBrandPayAccessToken 호출 오류:', error);
      alert('getBrandPayAccessToken 호출 실패');
    }
  };

  const handleIssueBillingKey = async () => {
    try {
      const response = await issueBillingKey({
        customerKey: "dummyCustomerKey",
        authKey: "dummyAuthKey",
      });
      console.log('issueBillingKey 응답:', response);
      alert('issueBillingKey 호출 성공');
    } catch (error) {
      console.error('issueBillingKey 호출 오류:', error);
      alert('issueBillingKey 호출 실패');
    }
  };

  const handleConfirmBillingPayment = async () => {
    try {
      const response = await confirmBillingPayment({
        customerKey: "dummyCustomerKey",
        amount: 50000,
        orderId: "orderIdBilling12345",
        orderName: "상품 이름",
        customerEmail: "customer@example.com",
        customerName: "홍길동",
      });
      console.log('confirmBillingPayment 응답:', response);
      alert('confirmBillingPayment 호출 성공');
    } catch (error) {
      console.error('confirmBillingPayment 호출 오류:', error);
      alert('confirmBillingPayment 호출 실패');
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        API 호출 테스트
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleConfirmWidgetPayment}>
            결제위젯 승인 테스트
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={handleConfirmPayment}>
            결제창 승인 테스트
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="success" onClick={handleConfirmBrandPay}>
            브랜드페이 승인 테스트
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="warning" onClick={handleGetBrandPayAccessToken}>
            Access Token 발급 테스트
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="info" onClick={handleIssueBillingKey}>
            빌링키 발급 테스트
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="error" onClick={handleConfirmBillingPayment}>
            자동결제 승인 테스트
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TestApi;
