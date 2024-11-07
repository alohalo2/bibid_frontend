import React from 'react';
import '../../css/Mypage/Mypage.css';
import MypageSideBar from '../../components/mypage/MypageSideBar';
import MypageWalletBox from '../../components/mypage/MypageWalletBox';

const Mypage_Wallet = () => {
	return (
        <div className='Mypage_Container'>
            <MypageSideBar/>
            <MypageWalletBox/>
        </div>
	);
};

export default Mypage_Wallet;