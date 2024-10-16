import React, { useState } from 'react';
import '../../css/CategoryItemDetail.css';
import img1 from '../../images/img1.png';
import img2 from '../../images/img2.png';
import img3 from '../../images/img3.png';
import img4 from '../../images/img4.png';
import img5 from '../../images/img5.png';
import CatItDetTab from './CatItDetTab';

const CatItDetInfo = () => {

  return (
    <div className="CID-item-info" id='CID-item-info'>
      <CatItDetTab/>
      <div className="CID-info-box">
        <h3>상품 설명</h3>
        <p>iBoy는 모든 것을 변화시킨 사랑받는 상징적인 MP3 플레이어에 대한 오마주입니다.<br/>
          사랑스럽고 변형이 가능하며 수집 가능한 인물입니다.<br/>
          각각의 iBoy의 자석 팔은 움직이고 가지고 놀 수 있는 무한한 즐거움을 선사합니다.<br/>
          장치의 로봇과 MP3 스타일 사이를 쉽게 전환할 수 있는 분리 가능한 실물과 같은 헤드폰도 있습니다.<br/>
          iBoy에는 전자 부품이나 기능이 100% 포함되어 있지 않지만 장치에는 쉽게 회전할 수 있는 컨트롤 휠과 클릭하기 쉬운 버튼이 함께 제공됩니다.<br/>
          <br/>
          지루할 때나 문제 해결을 위해 노력할 때 손을 뻗을 수 있는 정말 좋은 방법입니다!<br/>
          매우 깔끔한 라인과 디테일을 보장하기 위해 iBoy는 최첨단 성형 기계를 통해 최고 품질의 ABS 플라스틱으로 정밀하게 엔지니어링되었습니다.<br/>
          <br/>
          장치 뒷면은 아름답게 크롬 도금 처리되어 있으며 모든 흰색 부품은 내구성이 뛰어난 광택 페인트로 마감되어 있습니다. 각 장치의 버튼은 소유자에게 만족스러운 클릭과 프레스 후 반송으로 보상합니다.</p>
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
