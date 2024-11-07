import React, { useState } from 'react';
import { Grid2 } from "@mui/material";

const steps = [
    { text: '1<br />약관동의<br />및 확인' }, // 줄바꿈을 <br /> 태그로 처리
    { text: '2<br />정보입력' },
    { text: '3<br />가입완료' }
];

const Circle = ({activeStep}) => {

    return (
        <Grid2 container justifyContent="center" alignItems="center" spacing={2} marginBottom={3}>
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    <Grid2 item xs={3}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
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
                                lineHeight: '1.5', // 줄 간격 조정
                            }}>
                                <div dangerouslySetInnerHTML={{ __html: step.text }} /> {/* <br /> 태그로 줄바꿈 처리 */}
                            </div>
                        </div>
                    </Grid2>

                    {/* Insert Arrow between steps */}
                    {index < steps.length - 1 && (
                        <Grid2 item>
                            <div style={{
                                width: '5rem',
                                height: '10rem',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <img src="/images/Vector.svg" alt="Arrow" style={{ height: '2rem' }} />
                            </div>
                        </Grid2>
                    )}
                </React.Fragment>
            ))}
        </Grid2>
    );
};

export default Circle;
