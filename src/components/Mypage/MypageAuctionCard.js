import React from 'react'
import '../../css/Mypage/Mypage.css';

const MypageAuctionCard = () => {
  return (
    <div className='Mypage_AuctionCard'>
      <div className='Mypage_AuctionProcess'>
        <div className='Mypage_AuctionCardType'>경매 타입</div>
        <p className='Mypage_AuctionProcessLine'> 진행상황 막대 들어감 </p>
        <div className='Mypage_AuctionCardBtnCategory'>
            <div className='Mypage_AuctionCardBtn'>배송 조회</div>
        </div>
      </div>
      <div className='Mypage_AuctionContentBox'>
        <div className='Mypage_AuctionContentImgBox'>
            <div className='Mypage_AuctionContentImg'></div>
        </div>
        <div className='Mypage_AuctionContentDetail'>
            <div className='Mypage_AuctionContentDetailTitle'>제목</div>
            <div className='Mypage_AuctionContentDetailContainer'>
                <div className='Mypage_AuctionContentPrice'>
                    <div className='Mypage_AuctionContenttitle'>구매금액</div>
                    <div className='Mypage_AuctionContenttext'>1 원</div>
                </div>
                <div className='Mypage_AuctionContentNumber'>
                    <div className='Mypage_AuctionContenttitle'>경매번호</div>
                    <div className='Mypage_AuctionContenttext'>2 번</div>
                </div>
                <div className='Mypage_AuctionContentSeller'>
                    <div className='Mypage_AuctionContenttitle'>판매자명</div>
                    <div className='Mypage_AuctionContenttext'>3 님</div>
                </div>
            </div>
        </div>
        <div className='Mypage_AuctionContentBtnCategory'>
            <div className='Mypage_AuctionContentBtnBox'>
                <div className='Mypage_AuctionCardBtn'>수취 완료</div>
                <div className='Mypage_AuctionCardBtn'>거래 취소</div>
            </div>
        </div>
      </div>
      <div className='Mypage_AuctionAlert'>
        <div>*물품수령 후 의도적으로 수취완료를 누르지 않으면 형사처벌의 대상이 될 수 있습니다.*</div>
      </div>
    </div>
  )
}

export default MypageAuctionCard