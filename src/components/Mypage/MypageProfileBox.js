import React from 'react'

const MypageProfileBox = () => {
  return (
    <div className='Mypage_ProfileBoxContainer'>
      <div className='Mypage_UserInfoTitle'>회원정보 수정</div>
        <div className='Mypage_UserInfoContainer'>
          <div className='Mypage_UserInfoDetail'>
            <div>이름</div>
            <div className='rightOne'>ABC</div>
          </div>
          <div className='Mypage_UserInfoDetail'>
            <div>아이디</div>
            <div className='rightOne'>test01</div>
          </div>
          <div className='Mypage_UserInfoDetail'>
            <div>비밀번호</div>
            <div className='rightOne'>비밀번호는 표시되지 않습니다.</div>
          </div>
          <div className='Mypage_UserInfoDetail'>
            <div>휴대폰</div>
            <div className='rightOne'>010 - 1111 - 1111</div>
          </div>
          <div className='Mypage_UserInfoDetail'>
            <div>자택 번호</div>
            <div className='rightOne'>02 - 1111 - 1111</div>
          </div>
          <div className='Mypage_UserInfoDetail'>
            <div>이메일</div>
            <div className='rightOne'>bit@bit.com</div>
          </div>
          <div className='Mypage_UserInfoDetail2'>
            <div className='left-coulmn'>주소</div>
            <div className='right-coulmn'>
              <div className='rightOne'>123</div>
              <div className='rightTwo'>456</div>
            </div>
          </div>
        </div>
        <div className='Mypage_UserInfoModifyBtn'> 수정 </div>
    </div>
  )
}

export default MypageProfileBox