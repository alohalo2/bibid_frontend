import React, { useEffect, useState } from 'react'
import { MypageWalletRecordBox } from './MypageWalletRecordBox'
import { useSelector } from 'react-redux';

const MypageWalletBox = () => {

  const accountDto = useSelector((state) => state.memberSlice.accountDto);

  const handleChargeBttn = () => {
    // 충전 버튼 로직
  };

  return (  
    <div className='Mypage_WalletBoxContainer'>
      <div className='Mypage_UserInfoTitle'>지갑 관리</div>
        <div className='Mypage_WalletInfoContainer'>
          <div className='Mypage_WalletCredit'>
            <div>금액</div>
            <div>{accountDto.userMoney} 원</div>
          </div>
          <div className='Mypage_WalletBtn'>
            <div className=''>충전버튼(임시)</div>
            <div className=''>출금버튼(임시)</div>
          </div>
        </div>
        <div className='Mypage_WalletRecordLine'>
          <div>결제 및 충전 내역</div>
        </div>
        <div className='Mypage_WalletUsedContainer'>
          <div className='Mypage_WalletUsed'>
            <MypageWalletRecordBox records={accountDto.accountUseHistoryDtoList} />
          </div>
        </div>
        <div className='Mypage_BttnBox'>
          <button className='Mypage_Bttn' onClick={handleChargeBttn}>충전</button>
          <button className='Mypage_Bttn'>환전</button>
        </div>
    </div>
  )
}

export default MypageWalletBox