import React, { useEffect } from 'react';
import profileImageUrl from '../../images/profile_img.png';
import sellerImageUrl from '../../images/seller_img.png';
import buyerImageUrl from '../../images/buyer_img.png';
import infoUpdateIcon from '../../images/info_update_icon.png';
import infoBidsIcon from '../../images/info_bids_icon.png';
import infoWalletIcon from '../../images/info_wallet_icon.png';
import infoBidsGoingIcon from '../../images/info_bids_going_icon.png';
import infoInquiryIcon from '../../images/info_inquiry_icon.png';
import { useLocation } from 'react-router-dom';


const Mypage_sidebar = () => {
	const location = useLocation();

	useEffect(() => {
		switch(location.pathname){
			case '/mypage/info':
			case '/mypage/update':
				document.getElementById('etc1_update_btn').style.color = '#0A369D';
				document.getElementById('etc1_update_btn').style.fontWeight = 'bold';
				break;
			case '/mypage/bids_history':
			case '/mypage/bids_detail':
				document.getElementById('etc1_bids_history_btn').style.color = '#0A369D';
				document.getElementById('etc1_bids_history_btn').style.fontWeight = 'bold';
				break;
			case '/mypage/wallet_management':
				document.getElementById('etc1_wallet_btn').style.color = '#0A369D';
				document.getElementById('etc1_wallet_btn').style.fontWeight = 'bold';
				break;
			case '/mypage/bids_progress':
				document.getElementById('etc1_bids_progress_btn').style.color = '#0A369D';
				document.getElementById('etc1_bids_progress_btn').style.fontWeight = 'bold';
				break;
			case '/mypage/qna':
				document.getElementById('etc1_qna_btn').style.color = '#0A369D';
				document.getElementById('etc1_qna_btn').style.fontWeight = 'bold';
				break;
			default:
				
		}
	}, [location]);
	
	return (
			<div className='etc1_sidebar'>
				<img src={profileImageUrl} alt="Profile Image"></img>
				<h2>임세미</h2>
				<ul className='etc1_seller_buyer'>
					<li className='etc1_seller'>
						<img src={sellerImageUrl} alt="Seller Image"></img>
						<span>판매자</span>
					</li>
					<li className='etc1_buyer'>
						<img src={buyerImageUrl} alt="Buyer Image"></img>
						<span>구매자</span>
					</li>
				</ul>
				<nav>
					<h2>마이페이지 목록</h2>
					<ul>    
						<li>
							<a id='etc1_update_btn' href="/mypage/info">
								<img src={infoUpdateIcon} alt="회원정보 수정 아이콘"/>
								<span>회원정보 수정</span>
							</a>
						</li>
						<li>
							<a id='etc1_bids_history_btn' href="/mypage/bids_history">
								<img src={infoBidsIcon} alt="나의 경매 내역 아이콘"/>
								<span>나의 경매 내역</span>
							</a>
						</li>
						<li>
							<a id='etc1_wallet_btn' href="/mypage/wallet_management">
								<img src={infoWalletIcon} alt="지갑 관리 아이콘"/>
								<span>지갑 관리</span>
							</a>
						</li>
						<li>
							<a id='etc1_bids_progress_btn' href="/mypage/bids_progress">
								<img src={infoBidsGoingIcon} alt="경매 진행 현황 아이콘"/>
								<span>경매 진행 현황</span>
							</a>
						</li>
						<li>
							<a id='etc1_qna_btn' href="/mypage/qna">
								<img src={infoInquiryIcon} alt="문의 내역 현황 아이콘"/>
								<span>문의 내역</span>
							</a>
						</li>
					</ul>
				</nav>
			</div>
		);
};

export default Mypage_sidebar;