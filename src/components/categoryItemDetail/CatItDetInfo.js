import React, { useState } from 'react';
import '../../css/CategoryItemDetail.css';
import img1 from '../../images/img1.png';
import img2 from '../../images/img2.png';
import img3 from '../../images/img3.png';
import img4 from '../../images/img4.png';
import img5 from '../../images/img5.png';
import CatItDetTab from './CatItDetTab';

import CatItDetAxios from './CatItDetAxios';

const CatItDetInfo = ({ response }) => {

  console.log(response);
  if (!response) {
    return <div>Loading...</div>; // response가 없을 때 로딩 메시지를 출력
  }

  return (
    <div className="CID-item-info" id='CID-item-info'>
      <CatItDetTab/>
      <div className="CID-info-box">
        <h3>상품 설명</h3>
        <p> {response.productDescription} 마감되어 있습니다. 각 장치의 버튼은 소유자에게 만족스러운 클릭과 프레스 후 반송으로 보상합니다.</p>
          <br/>
        <legend>특징 :</legend>
        <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
          <li>특징1</li>
          <li>특징2</li>
          <li>특징3</li>
          <li>특징4</li>
          <li>특징5</li>
          <li style={{ listStyle: 'square', color: '#007bff' }}>연령제한 주의사항</li>
        </ul>
        <div className="CID-item-img-container">
          <img src={img1} alt="Item 1" />
          <img src={img2} alt="Item 2" />
          <img src={img3} alt="Item 3" />
          <img src={img4} alt="Item 4" />
          <img src={img5} alt="Item 5" />
        </div>
      </div>
    </div>
  );

};

export default CatItDetInfo;
