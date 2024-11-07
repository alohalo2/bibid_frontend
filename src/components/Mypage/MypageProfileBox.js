import React from 'react'
import { useSelector } from 'react-redux';

const MypageProfileBox = ({ memberInfo }) => {
  const memberIndex = useSelector((state) => state.memberSlice.memberIndex);

  const handleModify = () => {
    window.location.href = '/mypage/userInfo/modify'
  }
  
  return (
    <div className='Mypage_ProfileBoxContainer'>
      <div className='Mypage_TitleContainer'>
        <div className='Mypage_UserInfoTitle'>
          <h2>회원정보 수정</h2>
        </div>
      </div>
        <div className='Mypage_UserInfoContainer'>
          <div className='Mypage_UserInfoDetail3'>
            <div className='Mypage_UserInfoDetail_title'>
              <p>이름</p>
            </div>
            <div className='rightOne Mypage_UserInfoDetail_content'>
              <p>{memberInfo.name}</p>
            </div>
          </div>
          <div className='Mypage_UserInfoDetail'>
            <div className='Mypage_UserInfoDetail_title'>
              <p>아이디</p>
            </div>
            <div className='rightOne Mypage_UserInfoDetail_content'>
              <p>{memberInfo.memberId}</p>
            </div>
          </div>
          <div className='Mypage_UserInfoDetail'>
            <div className='Mypage_UserInfoDetail_title'>
              <p>비밀번호</p>
            </div>
            <div className='rightOne Mypage_UserInfoDetail_content'>
              <p>비밀번호는 표시되지 않습니다.</p>
            </div>
          </div>
          <div className='Mypage_UserInfoDetail'>
            <div className='Mypage_UserInfoDetail_title'>
              <p>닉네임</p>
            </div>
            <div className='rightOne Mypage_UserInfoDetail_content'>
              <p>{memberInfo.nickname}</p>
            </div>
          </div>
          <div className='Mypage_UserInfoDetail'>
            <div className='Mypage_UserInfoDetail_title'>
              <p>휴대폰</p>
            </div>
            <div className='rightOne Mypage_UserInfoDetail_content'>
              <p>{memberInfo.memberPnum}</p>
            </div>
          </div>
          <div className='Mypage_UserInfoDetail'>
            <div className='Mypage_UserInfoDetail_title'>
              <p>이메일</p>
            </div>
            <div className='rightOne Mypage_UserInfoDetail_content'>
              <p>{memberInfo.email}</p>
            </div>
          </div>
          <div className='Mypage_UserInfoDetail2'>
            <div className='left-coulmn Mypage_UserInfoDetail_title'>
              <p>주소</p>
            </div>
            <div className='right-coulmn Mypage_UserInfoDetail_content'>
              <div className='rightOne Mypage_UserInfoDetail_title'>
                <p>{memberInfo.memberAddress}</p>
              </div>
              <div className='rightTwo Mypage_UserInfoDetail_title'>
                <p>{memberInfo.addressDetail}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='Mypage_ModifyBtnContainer'>
          <button className='Mypage_UserInfoModifyBtn' onClick={handleModify} style={{cursor:'pointer'}}> 수정 </button>
        </div>
    </div>
  )
}

export default MypageProfileBox