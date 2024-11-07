import React, { useState } from 'react';
import '../../css/CategoryItemDetail.css';
import CatItDetTab from './CatItDetTab';
import loadingImage from '../../images/로딩화면.gif'

const CatItDetInfo = ({ auctionNumber, auctionItem, auctionImages }) => {


  const [activeTab, setActiveTab] = useState('info'); // 독립적인 activeTab 상태


  if (!auctionItem) {
    return <div className='loading_image'><img src={loadingImage}></img></div>; // auctionItem + auctionImg 가 없을 때 로딩 메시지를 출력
  }

  const startingLocalDateTime = (auctionItem.startingLocalDateTime);
  const endingLocalDateTime = (auctionItem.endingLocalDateTime);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-11을 1-12로 변환
    const day = String(date.getDate()).padStart(2, '0');
    const minute = String(date.getMinutes());
    return `${year}년 ${month}월 ${day}일 ${minute}분`;
  };

  return (
    <div className="CID-item-info" id='CID-item-info'>
      <CatItDetTab activeTab={activeTab} setActiveTab={() => setActiveTab('info')} />
      <div className="CID-info-box">
        <div className='CID-info'>
          <h3>상품 설명</h3>
          <p> {auctionItem.productDescription}</p>
        </div>
        <div className="CID-item-img-container">
          {auctionImages.map((imageUrl, index) => (
                <img className='CID-item-img-content'
                      key={index}
                      src={imageUrl}
                      alt={`Item ${index}`}/>
                ))}
        </div>
      </div>
    </div>
  );

};

export default CatItDetInfo;
