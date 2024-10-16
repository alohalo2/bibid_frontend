import React from 'react'

const Mypage_qna = () => {
    return (
        <div className='etc1_qna'>
            <h1>문의 내역</h1>
			<div className='etc1_qna_box'>
				<span className='etc1_check_msg'>
					최근 1년 내 문의 내역만 확인하실 수 있습니다.
				</span>
				<table className='etc1_qna_list'>
					<thead>
						<tr className='etc1_column'>
							<th>이름</th>
							<th>문의 제목</th>
							<th>등록일</th>
							<th>상태</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>회원</td>
							<td>회원 탈퇴는 어떻게 하나요?</td>
							<td>2024.09.23</td>
							<td>미접수</td>
						</tr>
						<tr>
							<td>회원</td>
							<td>회원 가입은 어떻게 하나요?</td>
							<td>2024.09.21</td>
							<td><strong className='etc1_qna_accept'>접수</strong></td>
						</tr>
					</tbody>
				</table>
			</div>
        </div>
    );
};

export default Mypage_qna;