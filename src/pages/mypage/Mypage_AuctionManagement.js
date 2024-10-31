import React from 'react';
import '../../css/Mypage/Mypage.css';
import MypageSideBar from '../../components/Mypage/MypageSideBar';
import MypageAuctionManagement from '../../components/Mypage/MypageAuctionManagement';

const Mypage_AuctionInfo = () => {
	return (
        <div className='Mypage_Container'>
            <MypageSideBar/>
            <MypageAuctionManagement/>
        </div>
	);
};

export default Mypage_AuctionInfo;