import React from 'react';
import '../../css/Mypage/Mypage.css';
import MypageSideBar from '../../components/mypage/MypageSideBar';
import MypageAuctionManagement from '../../components/mypage/MypageAuctionManagement';

const Mypage_AuctionInfo = () => {
	return (
        <div className='Mypage_Container'>
            <MypageSideBar/>
            <MypageAuctionManagement/>
        </div>
	);
};

export default Mypage_AuctionInfo;