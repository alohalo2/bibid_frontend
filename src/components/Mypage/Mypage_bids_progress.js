import React, { useState } from 'react';
import bids_image2 from '../../images/bids_image2.png';
import bids_image3 from '../../images/bids_image3.png';
import { Stack, Step, StepConnector, stepConnectorClasses, StepLabel, Stepper, styled } from '@mui/material';

const steps = ['경매 시작', '경매 완료', '결제 완료', '배송중', '배송완료'];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 13,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: theme.palette.primary.main,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: theme.palette.primary.main,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor: 
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));

  const CustomizedSteppers1 = () => {
    return (
        <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper alternativeLabel activeStep={5} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
}

const CustomizedSteppers2 = () => {
    return (
        <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper alternativeLabel activeStep={2} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
}

const Mypage_bids_progress = () => {

    return (
        <div className='etc1_auction-container'>
            <h1>경매 진행 사항</h1>
            <div className='etc1_category_progress'>
                <h3>카테고리 선택</h3>
                <button>일반 경매</button>
                <button>실시간 경매</button>
                <button>블라인드 경매</button>
                <button>구매한 경매</button>
                <button>판매한 경매</button>
            </div>
            <div className='etc1_common_action_item'>
                <div className='etc1_common_action_status'>
                    <h3>일반 경매</h3>
                    <div className='etc1_progressbar'>
                        <div className='etc1_progressbar_img'>
                            <CustomizedSteppers1 />
                        </div>
                    </div>
                    <div className='etc1_prgressbar_info_btn'>
                        <button>배송 조회</button>
                    </div>
                </div>
                <div className='etc1_bids_detail_info'>
                    <img src={bids_image2} className='etc1_bids_image'></img>
                    <div className='etc1_bids_title'>
                        <h3>리미티드 에디션 금장 글라인더</h3>
                        <div className='etc1_bids_seller_info'>
                            <div className='etc1_bids_seller_price'>
                                <span className='etc1_bids_sell_title'>구매 금액</span>
                                <span className='etc1_bids_sell_value'>256,000 원</span>
                            </div>
                            <div className='etc1_bid_seller_number'>
                                <span className='etc1_bids_seller_number_title'>경매 번호</span>
                                <span className='etc1_bids_seller_number_value'>1234328490</span>
                            </div>
                            <div className='etc1_bid_seller_name'>
                                <span className='etc1_bid_seller_name_title'>판매자</span>
                                <span className='etc1_bid_seller_name_value'>smileagain</span>
                            </div>
                        </div>
                    </div>
                    <div className='etc1_bids_deal_or_cancel' style={{'marginLeft' : '22.5%'}}>
                        <button>수취 완료</button>
                        <button>거래 취소</button>
                    </div>
                </div>
                <div className='etc1_bids_warning_msg'>
                    <span>물건을 수취하면 수취 완료를 바로 클릭 부탁드립니다.</span>
                    <span>수취 완료가 되지 않으면 판매자에게 정산이 이뤄지지 않습니다. </span>
                    <span className='etc1_warning_red'>* 의도적으로 수취 완료를 누르지 않거나 거래 취소할 경우 패널티가 적용됩니다. </span>
                </div>
            </div>
            <div className='etc1_common_action_item'>
                <div className='etc1_common_action_status'>
                    <h3>일반 경매</h3>
                    <div className='etc1_progressbar'>
                        <div className='etc1_progressbar_img'>
                            <CustomizedSteppers2 />
                            {/* <img src={progressbar_blue} className='etc1_progressbar_img_left'></img>
                            <img src={progressbar} className='etc1_progressbar_img_right'></img> */}
                        </div>
                        {/* <div className='etc1_progressbar_msg'>
                            <span>경매 시작</span>
                            <span>경매 완료</span>
                            <span>결제 완료</span>
                            <span>배송중</span>
                            <span>배송완료</span>
                        </div> */}
                    </div>
                    <div className='etc1_prgressbar_info_btn'>
                        <button>배송 조회</button>
                    </div>
                </div>
                <div className='etc1_bids_detail_info'>
                    <img src={bids_image3} className='etc1_bids_image'></img>
                    <div className='etc1_bids_title'>
                        <h3>인스탁스 리미티드 폴라로이드 카메라 + 필름 30장</h3>
                        <div className='etc1_bids_seller_info'>
                            <div className='etc1_bids_seller_price'>
                                <span className='etc1_bids_sell_title'>구매 금액</span>
                                <span className='etc1_bids_sell_value'>137,000 원</span>
                            </div>
                            <div className='etc1_bid_seller_number'>
                                <span className='etc1_bids_seller_number_title'>경매 번호</span>
                                <span className='etc1_bids_seller_number_value'>2748392893</span>
                            </div>
                            <div className='etc1_bid_seller_name'>
                                <span className='etc1_bid_seller_name_title'>판매자</span>
                                <span className='etc1_bid_seller_name_value'>DooNooN</span>
                            </div>
                        </div>
                    </div>
                    <div className='etc1_bids_deal_or_cancel' style={{'marginLeft' : '11%'}}>
                        <button>수취 완료</button>
                        <button>거래 취소</button>
                    </div>
                </div>
                <div className='etc1_bids_warning_msg'>
                    <span>물건을 수취하면 수취 완료를 바로 클릭 부탁드립니다.</span>
                    <span>수취 완료가 되지 않으면 판매자에게 정산이 이뤄지지 않습니다. </span>
                    <span className='etc1_warning_red'>* 의도적으로 수취 완료를 누르지 않거나 거래 취소할 경우 패널티가 적용됩니다. </span>
                </div>
            </div>
        </div>
    );
};

export default Mypage_bids_progress;