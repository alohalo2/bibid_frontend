import React from 'react'
import { MypageWalletRecord } from './MypageWalletRecord'

const MypageWalletBox = () => {
  return (
    <div className='Mypage_WalletBoxContainer'>
      <div className='Mypage_UserInfoTitle'>나의 실시간 경매</div>
        <div className='Mypage_WalletInfoContainer'>
          <div className='Mypage_WalletCredit'>

          </div>
          <div className=''>
            <div className=''> </div>
            <div className=''></div>
            <div className=''></div>
            <div className=''></div>
          </div>
        </div>
        <div>결제 및 충전 내역</div>
        <div className='Mypage_WalletUsedContainer'>
          <div className='Mypage_WalletUsed'>
            <MypageWalletRecord/>
          </div>
        </div>
    </div>
  )
}

export default MypageWalletBox