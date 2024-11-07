import React from 'react';
import '../../css/Mypage/Mypage.css';
import MypageSideBar from '../../components/Mypage/MypageSideBar';
import MypageAuctionBox from '../../components/Mypage/MypageAuctionBox';

const Mypage_AuctionInfo = () => {
	return (
        <div className='Mypage_Container'>
            <MypageSideBar/>
            <MypageAuctionBox/>
        </div>
	);
};

export default Mypage_AuctionInfo;