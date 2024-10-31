import React, { useEffect, useState } from 'react';
import '../../css/Mypage/Mypage.css';
import { format } from 'date-fns';
import defaultFileImg from '../../images/defaultFileImg.png';
import axios from 'axios';

const MypageMyAuctionCard = ({ auction, onDelete }) => {
  const bucketName = process.env.REACT_APP_BUCKET_NAME;

  const thumbnailImage = auction.auctionImageDtoList.find((image) => image.thumbnail === true);
  
  const imageSrc = thumbnailImage
    ? `https://kr.object.ncloudstorage.com/${bucketName}/${thumbnailImage.filepath}${thumbnailImage.filename}`
    : defaultFileImg;

  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(defaultFileImg);

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      setImageUrl(imageSrc);
      setIsLoading(false);
    };
    img.onerror = () => {
      setImageUrl(defaultFileImg);
      setIsLoading(false);
    };
  }, [imageSrc]);

  const formatAuctionDate = (startLocalDateTime, endLocalDateTime) => {
    const startDate = format(new Date(startLocalDateTime), 'yyyy.MM.dd');
    const endDate = format(new Date(endLocalDateTime), 'yyyy.MM.dd');
    return `${startDate} ~ ${endDate}`;
  };

  const lastBidAmount = auction.auctionInfoDtoList?.length > 0
    ? auction.auctionInfoDtoList[auction.auctionInfoDtoList.length - 1].bidAmount
    : auction.startingPrice;

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/mypage/my-auctions/${auction.auctionIndex}`, { withCredentials: true });
      console.log(auction.auctionIndex);
      onDelete(auction.auctionIndex); // 부모 핸들러 호출
    } catch (error) {
      console.error('경매 삭제 중 오류 발생:', error);
    }
  };

  return (
    <div className='Mypage_AuctionManagementCard'>
      <div className='Mypage_AuctionManagementCardImgBox'>
        <img
          src={isLoading ? defaultFileImg : imageUrl}
          alt="경매 썸네일"
          className="Mypage_AuctionManagementCardImg"
        />
      </div>
      <div className='Mypage_AuctionManagementCardTitleBox'>
        <div className='MypageAuctionManagementCardTitle'>{auction.productName}</div>
      </div>
      <div className='Mypage_AuctionManagementCardPrice'>{lastBidAmount.toLocaleString()} 원</div>
      <div className='Mypage_AuctionManagementCardBid'>{auction.bidIncrement.toLocaleString()} 원</div>
      <div className='Mypage_AuctionManagementCardPeriod'>{formatAuctionDate(auction.startingLocalDateTime, auction.endingLocalDateTime)}</div>
      <div className='Mypage_AuctionManagementCardDeleteBtnBox'>
        <div className='Mypage_AuctionManagementCardDeleteBtn' onClick={handleDelete}>
          삭제
        </div>
      </div>
    </div>
  );
};

export default MypageMyAuctionCard;