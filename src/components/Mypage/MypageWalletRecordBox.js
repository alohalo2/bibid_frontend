import React from 'react';
import '../../css/Mypage/Mypage.css';
import { MypageWalletRecord } from './MypageWalletRecord';

export const MypageWalletRecordBox = ({ records }) => {
  return (
    <>
        {records.slice().reverse().map((record, index) => (
          <MypageWalletRecord key={index} record={record} />
      ))}
    </>
  )
}
