import React, { useState, useEffect } from 'react';
import '../../css/Mypage/Mypage.css';
import MypageAuctionProcessLine from './MypageAuctionProcessLine';
import { format } from 'date-fns';
import defaultFileImg from '../../images/defaultFileImg.png';

const MypageMyAuctionCard = ({ auction }) => {
  const bucketName = process.env.REACT_APP_BUCKET_NAME;

  const thumbnailImage = auction.auctionImageDtoList.find((image) => image.thumbnail === true);
  
  const imageSrc = thumbnailImage
    ? `https://kr.object.ncloudstorage.com/${bucketName}/${thumbnailImage.filepath}${thumbnailImage.filename}`
    : '/images/defaultFileImg.png';

  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(defaultFileImg);

  useEffect(() => {
    if (thumbnailImage) {
      const newImageUrl = imageSrc;
      const img = new Image();
      img.src = newImageUrl;

      img.onload = () => {
        setImageUrl(newImageUrl);
        setIsLoading(false);
      };
      img.onerror = () => {
        setImageUrl(defaultFileImg);
        setIsLoading(false);
      };
    } else {
      setImageUrl(defaultFileImg);
      setIsLoading(false);
    }
  }, [imageSrc, thumbnailImage]);

  const formatAuctionDate = (startLocalDateTime, endLocalDateTime) => {
    const startDate = format(new Date(startLocalDateTime), 'yyyy.MM.dd');
    const endDate = format(new Date(endLocalDateTime), 'yyyy.MM.dd');
    return `${startDate} ~ ${endDate}`;
  };

  const lastBidAmount = auction.auctionInfoDtoList && auction.auctionInfoDtoList.length > 0
    ? auction.auctionInfoDtoList[auction.auctionInfoDtoList.length - 1].bidAmount
    : auction.startingPrice;

  return (
    <div className='Mypage_AuctionManagementCard'>
      <div className='Mypage_AuctionManagementCardImgBox'>
        <img
          src={isLoading ? defaultFileImg : imageUrl}
          alt="Auction Thumbnail"
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
        <div className='Mypage_AuctionManagementCardDeleteBtn'>삭제</div>
      </div>
    </div>
  );
};

export default MypageMyAuctionCard;