import React from 'react'
import { MypageWalletRecordBox } from './MypageWalletRecordBox'

const MypageWalletBox = () => {

  const handleChargeBttn = () => {
    
  }

  return (
    <div className='Mypage_WalletBoxContainer'>
      <div className='Mypage_UserInfoTitle'>지갑 관리</div>
        <div className='Mypage_WalletInfoContainer'>
          <div className='Mypage_WalletCredit'>
            <div>금액</div>
            <div>xxx 원</div>
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
            <MypageWalletRecordBox/>
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