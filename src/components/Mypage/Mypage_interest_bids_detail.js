import React from 'react'
import detailBidsImageUrl from '../../images/detail_bids_product.png';
import heartImageUrl from '../../images/interest_bids_heart.png';
import slideImageUrl from '../../images/bids_images_slide.png'
import leftImageUrl from '../../images/left.svg';
import rightImageUrl from '../../images/right_arrow_icon.svg';
import lineImageUrl from '../../images/bids_line.png';

const Mypage_interest_bids_detail = () => {
    return (
        <div className='etc1_interest_bids_detail'>
            <h2>관심 경매 &gt; 상세 페이지</h2>
            <div className='etc1_interest_bids_detail_box'>
				<div className='etc1_interest_bids_detail_image_box'>
					<img src={detailBidsImageUrl} />
				</div>
				<div className='etc1_interest_bids_detail_info'>
					<div className='etc1_interest_bids_title_box'>
						<h1>Classibot (iBoy)</h1>
						<img className='interest_heart_icon' src={heartImageUrl} />
					</div>
					<div className='etc1_current_price_box'>
						<span className='etc1_current_price_title'>현재가</span>
						<div className='etc1_current_price_value'>56,000 원</div>
					</div>
					<div className='etc1_rest_time_box'>
						<span className='etc1_rest_time_title'>남은시간</span>
						<div className='etc1_rest_time'>
							<div className='etc1_rest_time_value'>3일 5시간 48분 20초</div>
							<div className='etc1_due_time_value'>(2024년 09월 05일 22:30:00)</div>
						</div>
					</div>
					<div className='etc1_bids_number_box'>
						<span className='etc1_bids_number_title'>경매번호</span>
						<div className='etc1_bids_number_value'>234789023124</div>
					</div>
					<div className='etc1_bids_record_box'>
						<span className='etc1_bids_record_title'>입찰기록</span>
						<div className='etc1_bids_record_value'>3회 [기록보기]</div>
					</div>
					<div className='etc1_bids_unit_box'>
						<span className='etc1_bids_unit_title'>입찰단위</span>
						<div className='etc1_bids_unit_value'>1000 원</div>
					</div>
					<div className='etc1_bids_hope_price_box'>
						<span className='etc1_bids_hope_price_title'>희망 입찰가</span>
						<input type='text' className='etc1_bid_input_price' value='57,000' readOnly />
						<span className='etc1_bids_input_price_unit'>원</span>
						<div className='etc1_button_container'>
							<button className='bid_pirce_plus_btn'>+</button>
							<button className='bid_pirce_minus_btn'>-</button>
						</div>
					</div>
					<div className='etc1_bids_predict_price_box'>
						<span className='etc1_bids_predict_price_title'>예상 구매가</span>
						<div className='etc1_predict_value_box'>
							<span className='etc1_predict_value'>62,700 원</span>
							<span className='etc1_predict_and_charge_value'>(57,000 원 + 구매수수료 5,700 원)</span>
						</div>
					</div>
				</div>
            </div>
            
			<div className='etc1_more_bids_images'>
				<div className='etc1_image_box'>
					<img className='etc1_arrow_icon' src={leftImageUrl}></img>
					<img className='etc1_slide_box' src={slideImageUrl}></img>
					<img className='etc1_arrow_icon' src={rightImageUrl}></img>
				</div>
				<div className='etc1_line_box'>
					<img src={lineImageUrl} />
				</div>
			</div>
			<div className='etc1_seller_info_box'>
				<div className='etc1_seller_info_id_sell_cnt'>
					<span>판매자 <strong>M_Merchant</strong> 진행중인 경매 <strong>1,128 건</strong></span>
				</div>
				<div className='etc1_bids_btn_box'>
					<button className='etc1_bids_seller_info_more'>판매자 정보 더보기</button>
				</div>
			</div>
			<div className='etc1_bids_buy_btn'>
				<button className='etc1_bid_buy_btn'>입찰하기</button>
				<button className='etc1_instant_buy_btn'>110,000 원으로 즉시 구매</button>
			</div>
			<div className='etc1_delete_btn_box'>
				<button className='etc1_delete_interest_bids_btn'>관심 경매에서 삭제</button>
			</div>
        </div>
    );
};

export default Mypage_interest_bids_detail;