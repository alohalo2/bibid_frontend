import React from 'react';
import '../../css/Category.css';
import defaultFileImg from '../../images/defaultFileImg.png';

const ProductLine = ({ products }) => {
  return (
    <div className='CTG_productLine'>
      <div className='CTG_grid-container-product'>
        {products.map((product) => {
          // 입찰 횟수는 AuctionInfo 리스트의 길이로 계산
          const bids = product.auctionInfoDtoList ? product.auctionInfoDtoList.length : 0;

          // 남은 시간 계산
          const timeLeft = new Date(product.endingLocalDateTime) - new Date();

          let timeLeftFormatted;
          if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24)); // 남은 일 수 계산
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // 24시간 이하 남은 시간
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)); // 남은 분
            timeLeftFormatted = `${days > 0 ? `${days}일 ` : ''}${hours}시간 ${minutes}분 남음`;
          } else {
            timeLeftFormatted = '경매 종료';
          }

          // 이미지 URL 설정
          const thumbnailImage = product.auctionImageDtoList.find(image => image.thumbnail === true);
          const imageSrc = thumbnailImage && thumbnailImage.filetype === 'image'
            ? `https://kr.object.ncloudstorage.com/bitcamp73/${thumbnailImage.filepath}${thumbnailImage.filename}`
            : defaultFileImg;

          return (
            <div className='CTG_flex-item' key={product.auctionIndex}>
              <img src={imageSrc}
                className="CTG_grid-item-product"
                alt={product.productName} // 이미지 설명 추가
              />
              <div className='CTG_grid-item-text'>
                <div className='CTG_productText'>
                  <p className="CTG_productName">{product.productName}</p>
                  <p className="CTG_startingPrice">{product.startingPrice !== null ? product.startingPrice.toLocaleString() : '가격 정보 없음'} 원</p> {/* 가격에 천 단위 구분자 추가 */}
                  <p className="CTG_bidInfo">입찰 {bids}회 | {timeLeftFormatted}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductLine;