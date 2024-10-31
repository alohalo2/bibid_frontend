import React, { useEffect, useState } from 'react'
import { MypageWalletRecordBox } from './MypageWalletRecordBox'
import { useDispatch, useSelector } from 'react-redux';
import { chargeAccount, exchangeAccount, buyAuction, sellAuction } from '../../apis/etc2_memberapis/memberApis'


const MypageWalletBox = () => {

  const dispatch = useDispatch();
  const [response, setResponse] = useState(null);

  const accountDto = useSelector((state) => state.memberSlice.accountDto);


  // 충전 
  const handleChargeAccount = async () => {
    const dummyData = {
      changeAccount: '5000', // 충전 금액
      useType: '충전'
    };

    // dispatch로 chargeAccount 액션 호출
    const resultAction = await dispatch(chargeAccount(dummyData));
    if (chargeAccount.fulfilled.match(resultAction)) {
      setResponse(resultAction.payload);
      console.log('Charge Account 성공:', resultAction.payload);
    } else {
      setResponse(`Error: ${resultAction.error.message}`);
    }
  };

  // 환전
  const handleExchangeAccount = async () => {
    const dummyData = {
      changeAccount: '2000', // 환전 금액
      useType: '환전'
    };

    const resultAction = await dispatch(exchangeAccount(dummyData));
    if (exchangeAccount.fulfilled.match(resultAction)) {
      setResponse(resultAction.payload);
      console.log('Exchange Account 성공:', resultAction.payload);
    } else {
      setResponse(`Error: ${resultAction.error.message}`);
    }
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
          {accountDto.accountUseHistoryDtoList && accountDto.accountUseHistoryDtoList.length > 0 ? (
            <MypageWalletRecordBox records={accountDto.accountUseHistoryDtoList} />
          ) : (
            <div className='Mypage_NoRecord'>이용 기록이 없습니다.</div>
          )}
        </div>
        </div>
        <div className='Mypage_BttnBox'>
          <button className='Mypage_Bttn' onClick={handleChargeAccount}>충전</button>
          <button className='Mypage_Bttn' onClick={handleExchangeAccount}>환전</button>
        </div>
    </div>
  )
}

export default MypageWalletBox