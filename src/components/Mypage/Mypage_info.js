import React from 'react'
import profileImageUrl from '../../images/profile_img.png';

const Mypage_info = () => {

	const goupdateInfo = () => {
		window.location.href = '/mypage/update'
	}
    return (
        <div className='etc1_profile'>
            <h2>회원정보 수정</h2>
            <div className='etc1_profile-image'>
				<img src={profileImageUrl} alt='Profile Image'></img>
            </div>
            <table className='etc1_info'>
				<tbody>
					<tr className='etc1_name'>
						<th>이름</th>
						<td>임세미</td>
					</tr>
					<tr className='etc1_user_id'>
						<th>아이디</th>
						<td>imsemi</td>
					</tr>
					<tr className='etc1_password'>
						<th>비밀번호</th>
						<td>비밀번호는 노출되지 않습니다.</td>
					</tr>
					<tr className='etc1_mobile_phone'>
						<th>휴대전화</th>
						<td>010 - 1111 - 1111</td>
					</tr>
					<tr className='etc1_phone'>
						<th>자택 전화</th>
						<td>02 - 1111 - 1111</td>
					</tr>
					<tr className='etc1_email'>
						<th>이메일</th>
						<td>imsemi@gmail.com</td>
					</tr>
					<tr className='etc1_address'>
						<th>주소</th>
						<td className='etc1_address_detail_1'>서울시 동대문구 589-23</td>
						<td className='etc1_address_detail_2'>동신빌라 202호</td>
					</tr>
				</tbody>
            </table>
			<button className='info_update_btn' onClick={goupdateInfo}>
				수정
			</button>
			
        </div>
    );
};

export default Mypage_info;