import React from 'react';
import '../../css/Mypage/Mypage.css';
import MypageSideBar from '../../components/Mypage/MypageSideBar';
import MypageWalletBox from '../../components/Mypage/MypageWalletBox';

const Mypage_Wallet = () => {
	return (
        <div className='Mypage_Container'>
            <MypageSideBar/>
            <MypageWalletBox/>
        </div>
	);
};

export default Mypage_Wallet;