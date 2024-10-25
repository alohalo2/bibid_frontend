import React from 'react'
import '../../css/Mypage/Mypage.css';

const MypageSideBar = () => {

  // const profileImg = 실제이미지경로;

  return (
    <div className='Mypage_SideBarContainer'>
        <div className='Mypage_SideBarProfile'>
            <div className='Mypage_ProfileImg' src='{profileImg}'>
              <div className='Mypage_ProfileImgModifyBtn'></div>
            </div>
            <div className='Mypage_ProfileUserName'>
              유저이름
            </div>
        </div>
        <div className='Mypage_SideBarCategory'>
            <div>내 프로필</div>
            <div>경매 내역</div>
            <div>지갑 관리</div>
            <div>문의 내역</div>
            <div></div>
        </div>
    </div>
  )
}

export default MypageSideBar