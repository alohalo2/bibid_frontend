import React from 'react';
import '../../css/Mypage/Mypage.css';
import MypageSideBar from '../../components/mypage/MypageSideBar';
import MypageAuctionBox from '../../components/mypage/MypageAuctionBox';

const Mypage_AuctionInfo = () => {
	return (
        <div className='Mypage_Container'>
            <MypageSideBar/>
            <MypageAuctionBox/>
        </div>
	);
};

export default Mypage_AuctionInfo;