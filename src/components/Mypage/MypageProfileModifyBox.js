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
        <div className='Mypage_UserInfoTitle'>회원정보 수정</div>
      </div>
      <div className='Mypage_UserInfoContainer'>
        <div className='Mypage_UserInfoDetail3'>
          <div>이름</div>
          <input type='text' className='rightOne2' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='Mypage_UserInfoDetail'>
          <div>아이디</div>
          <input type='text' className='rightOne2' value={memberInfo.memberId} readOnly />
        </div>
        <div className='Mypage_UserInfoDetail'>
          <div>비밀번호</div>
          <input type='password' className='rightOne2' placeholder='비밀번호를 입력하세요' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='Mypage_UserInfoDetail'>
          <div>닉네임</div>
          <input type='text' className='rightOne2' value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </div>
        <div className='Mypage_UserInfoDetail'>
          <div>휴대폰</div>
          <input type='text' className='rightOne2' value={memberPnum} onChange={(e) => setMemberPnum(e.target.value)} />
        </div>
        <div className='Mypage_UserInfoDetail'>
          <div>이메일</div>
          <input type='email' className='rightOne2' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='Mypage_UserInfoDetail2'>
          <div className='left-column'>주소</div>
          <div className='right-column'>
            <input type='text' className='rightOne2' value={memberAddress} onChange={(e) => setMemberAddress(e.target.value)} />
            <input type='text' className='rightTwo2' value={addressDetail} onChange={(e) => setAddressDetail(e.target.value)} />
          </div>
        </div>
      </div>
      <div className='Mypage_ModifyBtnContainer'>
        <div className='Mypage_UserInfoModifyBtn' onClick={handleModify}> 수정 완료 </div>
      </div>
    </div>
  )
}

export default MypageProfileModifyBox;