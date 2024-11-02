import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const MypageProfileModifyBox = ({ memberInfo }) => {
  const memberIndex = useSelector((state) => state.memberSlice.memberIndex); 

  // 상태 관리
  const [name, setName] = useState(memberInfo.name);
  const [nickname, setNickname] = useState(memberInfo.nickname);
  const [memberPnum, setMemberPnum] = useState(memberInfo.memberPnum);
  const [email, setEmail] = useState(memberInfo.email);
  const [memberAddress, setMemberAddress] = useState(memberInfo.memberAddress);
  const [addressDetail, setAddressDetail] = useState(memberInfo.addressDetail);
  const [password, setPassword] = useState('');

  const handleModify = () => {
    // 수정 로직을 여기에 추가하세요.
    console.log({
      name,
      nickname,
      memberPnum,
      email,
      memberAddress,
      addressDetail,
      password,
    });
  };

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
          <input type='text' className='rightOne2' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='Mypage_UserInfoDetail'>
          <div className='Mypage_UserInfoDetail_title'>
            <p>아이디</p>
          </div>
          <input type='text' className='rightOne2' value={memberInfo.memberId} readOnly />
        </div>
        <div className='Mypage_UserInfoDetail'>
          <div className='Mypage_UserInfoDetail_title'>
            <p>비밀번호</p>
          </div>
          <input type='password' className='rightOne2' placeholder='비밀번호를 입력하세요' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='Mypage_UserInfoDetail'>
          <div className='Mypage_UserInfoDetail_title'>
            <p>닉네임</p>
          </div>
          <input type='text' className='rightOne2' value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </div>
        <div className='Mypage_UserInfoDetail'>
          <div className='Mypage_UserInfoDetail_title'>
            <p>휴대폰</p>
          </div>
          <input type='text' className='rightOne2' value={memberPnum} onChange={(e) => setMemberPnum(e.target.value)} />
        </div>
        <div className='Mypage_UserInfoDetail'>
          <div className='Mypage_UserInfoDetail_title'>
            <p>이메일</p>
          </div>
          <input type='email' className='rightOne2' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='Mypage_UserInfoDetail2'>
          <div className='left-column Mypage_UserInfoDetail_title'>
            <p>주소</p>
          </div>
          <div className='right-column'>
            <div className='right-column-top'>
              <input type='text' className='rightOne2' value={memberAddress} onChange={(e) => setMemberAddress(e.target.value)} />
            </div>
            <div className='right-column-bottom'>
              <input type='text' className='rightTwo2' value={addressDetail} onChange={(e) => setAddressDetail(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
      <div className='Mypage_ModifyBtnContainer'>
        <button className='Mypage_UserInfoModifyBtn' onClick={handleModify}> 수정 완료 </button>
      </div>
    </div>
  )
}

export default MypageProfileModifyBox;