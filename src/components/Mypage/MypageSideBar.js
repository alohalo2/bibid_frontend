import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadProfileImage } from '../../apis/etc2_memberapis/memberApis';
import '../../css/Mypage/Mypage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MypageSideBar = ({ memberInfo }) => {

  const bucketName = process.env.REACT_APP_BUCKET_NAME;
  const member = useSelector((state) => state.memberSlice);
  const dispatch = useDispatch(); // dispatch 함수 추가
  const [profileImageDto, setProfileImageDto] = useState(member.profileImageDto);
  const [loading, setLoading] = useState(false);
  const navi = useNavigate();

  // 프로필 이미지가 없으면 기본 이미지를 사용하도록 조건 추가
  const imageSrc = profileImageDto && profileImageDto.filepath && profileImageDto.newfilename
    ? `https://kr.object.ncloudstorage.com/${bucketName}/${profileImageDto.filepath}${profileImageDto.newfilename}`
    : '/default_profile.png'; // 기본 이미지 경로 설정

  useEffect(() => {
    setProfileImageDto(member.profileImageDto);
  }, [member.profileImageDto]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profileImage', file);
      formData.append('memberIndex', member.memberIndex);

      try {
        setLoading(true);
        // uploadProfileImage 액션을 디스패치하여 이미지 업로드
        const actionResult = await dispatch(uploadProfileImage(formData));

        // 성공적으로 업로드되었는지 확인
        if (uploadProfileImage.fulfilled.match(actionResult)) {
          setProfileImageDto(actionResult.payload); // local state 업데이트
        } else {
          console.error('프로필 이미지 업로드 오류:', actionResult.payload);
        }
      } catch (error) {
        console.error('Failed to upload profile image:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleProfileImageClick = () => document.getElementById('profileImageInput').click();

  const handleProfileClick =() => {
    window.location.href = '/mypage/userInfo';
  }

  const handleAuctionClick =() => {
    window.location.href = '/mypage/auctionInfo';
  }

  const handleWalletClick =() => {
    window.location.href = '/mypage/wallet';
  }

  const handleQnaClick =() => {
    window.location.href = '/mypage/qna';
  }

  const handleSellerClick =() => {
    window.location.href = '/mypage/sellerInfo';
  }

  const handleManagement = () => {
    window.location.href = '/mypage/auctionmanagement';
  }

  return (
    <div className='Mypage_SideBarContainer'>
        <div className='Mypage_SideBarProfile'>
            <div className='Mypage_ProfileImgContainer' onClick={handleProfileImageClick}>
              <img className='Mypage_ProfileImg' src={imageSrc} alt="Profile" />
              <div className='Mypage_ProfileImgModifyBtn'>{loading ? "수정 중..." : "수정"}</div>
              <input
                type="file"
                id="profileImageInput"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className='Mypage_ProfileUserName'>
        </div>
        </div>
        <div className='Mypage_SideBarCategory'>
            <div onClick={handleProfileClick} style={{ cursor: 'pointer' }} >내 프로필</div>
            <div onClick={handleManagement} style={{ cursor: 'pointer' }} >내가 등록한 경매</div>
            <div onClick={handleAuctionClick} style={{ cursor: 'pointer' }} >참여중인 경매</div>
            <div onClick={handleWalletClick} style={{ cursor: 'pointer' }} >지갑 관리</div>
            <div onClick={handleSellerClick} style={{ cursor: 'pointer' }} >판매자 정보 등록</div>
        </div>
    </div>
  )
}

export default MypageSideBar