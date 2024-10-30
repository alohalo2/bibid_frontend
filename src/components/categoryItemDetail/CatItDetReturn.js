import React, { useState } from 'react';
import '../../css/CategoryItemDetail.css';
import CatItDetTab from './CatItDetTab';

const CatItDetReturn = () => {
  const [activeTab, setActiveTab] = useState('return'); // 독립적인 activeTab 상태

  return (
    <div className="CID-item-return-info" id='CID-item-return-info'>
      <CatItDetTab activeTab={activeTab} setActiveTab={() => setActiveTab('return')} />
      <div className="CID-info-box">
        <h3>● 반품시 주의사항</h3>
        <ul style={{ paddingLeft: '30px' }}>
          <li>아래 각호의 경우에는 반품이 되지 않습니다.</li>
          <li>1) 소비자의 책임 있는 사유로 상품 등이 멸실 / 훼손된 경우(단지 확인을 위한 포장 훼손 제외)</li>
          <li>2) 소비자의 사용 / 소비에 의해 상품 등의 가치가 현저히 감소한 경우</li>
          <li>3) 시간의 경과에 의해 재판매가 곤란할 정도로 상품 등의 가치가 현저히 감소한 경우</li>
          <li>4) 복제가 가능한 상품 등의 포장을 훼손한 경우</li>
          <li>5) 판매 / 생산방식의 특성상, 반품 시 판매자 에게 회복할 수 없는 손해가 발생하는 경우(주문접수 후 개별생산, 맞춤 제작 등)</li>
        </ul>
      </div>

      <div className="CID-info-box">
        <h3>● 파손물품 반품시 주의사항</h3>
        <div style={{ paddingLeft: '30px' }}>
          <p>물품 수령시 택배기사와 함께 물품의 파손여부를 확인하신 후,</p>
          <p>반품 신청시 파손이미지를 등록해 주시면 신속하게 환불 처리해드립니다.</p>
        </div>
      </div>

      {/* Circular Progress Section */}
      <div className="CID-steps-section">
        <div className="CID-step">
          <div className="CID-circle">STEP 1</div>
          <p>마이페이지</p>
        </div>
        <div className="CID-step">
          <div className="CID-circle">STEP 2</div>
          <p>구매내역</p>
        </div>
        <div className="CID-step">
          <div className="CID-circle">STEP 3</div>
          <p>구매결정대기 클릭<br/>(주문확인)</p>
        </div>
        <div className="CID-step">
          <div className="CID-circle">STEP 4</div>
          <p>거래완료 클릭</p>
        </div>
      </div>
    </div>
  );
};

export default CatItDetReturn;
