import React from 'react';
import { Grid2, Typography } from '@mui/material';

const steps = [
    { label: '카테고리 선택' },
    { label: '물품 및 경매 설정' },
    { label: '배송 및 기타 설정' },
    { label: '물품 등록 완료' },
  ];

const RegisterProgress = ({ activeStep }) => {
  return (
    
    <>
      <Typography variant="h5" sx={{ fontWeight: 'bold', my: 4 }}>물품등록</Typography>

      <Grid2 container justifyContent="center" alignItems="center" spacing={2}>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <Grid2 xs={3}>
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '10rem',
                    height: '10rem',
                    backgroundColor: activeStep === index ? '#1a2947' : '#ddd',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                    fontWeight: 400,
                    fontSize: '1.3rem',
                  }}
                >
                  {`STEP ${index + 1}`}
                </div>
                <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                  {step.label}
                </Typography>
              </div>
            </Grid2>

            {/* Insert Arrow between steps */}
            {index < steps.length - 1 && (
              <Grid2>
                <div
                  style={{
                    width: '5rem',
                    height: '10rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img src="/images/Vector.svg" alt="Arrow" style={{ height: '2rem' }} />
                </div>
              </Grid2>
            )}
          </React.Fragment>
        ))}
      </Grid2>
    </>
  );
};

export default RegisterProgress;