import React, { useEffect } from 'react';
import '../../css/Category.css';
import defaultFileImg from '../../images/defaultFileImg.png';
import { useSelector } from 'react-redux';
import { setBoards } from '../../slices/search/searchSlice';

const ProductLineForSearch = () => {
    const products = useSelector(state => state.auction.boards);

    const bucketName = process.env.REACT_APP_BUCKET_NAME;

    useEffect(() => {
        if (products) {
            // boards 데이터를 products로 설정
            setBoards(products);
        }
    }, [products]);

    const handleItemClick = (auctionIndex) => {
        window.location.href = `/category-itemdetail/${auctionIndex}`;
      };

    return (
        <div className='CTG_productLine'>
            <div className='CTG_grid-container-product'>
                {products.map((product, index) => {
                    const bids = product.auctionInfoDtoList ? product.auctionInfoDtoList.length : 0;
                    const timeLeft = new Date(product.endingLocalDateTime) - new Date();
                    let timeLeftFormatted;

                    if (timeLeft > 0) {
                        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                        timeLeftFormatted = `${days > 0 ? `${days}일 ` : ''}${hours}시간 ${minutes}분 남음`;
                    } else {
                        timeLeftFormatted = '경매 종료';
                    }

                    const thumbnailImage = product.auctionImageDtoList.find(image => image.thumbnail === true);
                    const imageSrc = thumbnailImage && thumbnailImage.filetype === 'image'
                        ? `https://kr.object.ncloudstorage.com/${bucketName}/${thumbnailImage.filepath}${thumbnailImage.filename}`
                        : defaultFileImg;

                    return (
                        <div className='CTG_flex-item' key={`${product.auctionIndex}-${index}`}>
                            <img src={imageSrc}
                                className="CTG_grid-item-product"
                                alt={product.productName}
                                onClick={() => handleItemClick(product.auctionIndex)}
                            />
                            <div className='CTG_grid-item-text'>
                                <div className='CTG_productText'>
                                    <h3 className="CTG_productName">{product.productName}</h3>
                                    <p className="CTG_startingPrice">
                                        {product.startingPrice !== null && 
                                        (product.auctionInfoDtoList.length === 0 || 
                                            product.auctionInfoDtoList[product.auctionInfoDtoList.length - 1].bidderIndex === null)
                                            ? product.startingPrice.toLocaleString() 
                                            : product.auctionInfoDtoList.length > 0 
                                            ? product.auctionInfoDtoList[product.auctionInfoDtoList.length - 1].bidAmount.toLocaleString() 
                                            : '가격 정보 없음'} 원
                                        </p>
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

export default ProductLineForSearch;