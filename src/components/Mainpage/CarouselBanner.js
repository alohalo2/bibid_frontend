import React, { useState, useEffect } from 'react';
import '../../css/CarouselBanner.css';
import { getAuctionData } from '../../apis/SpecialAuction/SAapis';
import { useSelector, useDispatch } from 'react-redux';
import {   formatDateTime , formatAuctionTimeRange  } from '../../util/utils';
import { useNavigate } from 'react-router-dom'; 
import ad1 from '../../images/mainpage_ad_image1.png'
import ad2 from '../../images/mainpage_ad_image2.gif'
import ad3 from '../../images/mainpage_ad_image3.png'
import ad4 from '../../images/mainpage_ad_image4.gif'
import ad5 from '../../images/mainpage_ad_image5.gif'

const CarouselBanner = () => {

  // const bucketName = process.env.REACT_APP_BUCKET_NAME;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { liveAuctionList } = useSelector((state) => state.specialAuctionSlice);
  const [carouselData, setCarouselData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // 로컬 이미지 배열
  const images = [ad1, ad2, ad3, ad4, ad5];

  // const fetchCarouselData = () =>
  //   liveAuctionList.map((auction) => {
  //     const thumbnailImage = auction.auctionImageDtoList
  //       .filter((image) => image.thumbnail === true)
  //       .map((image) => `https://kr.object.ncloudstorage.com/${bucketName}/${image.filepath}${image.filename}`)[0]; // 첫 번째 썸네일만 선택
  //     return {
  //       url: thumbnailImage,
  //       title: auction.productName,
  //       auctionDate: formatDateTime(auction.startingLocalDateTime),
  //       auctionTime: formatAuctionTimeRange(auction.startingLocalDateTime, auction.endingLocalDateTime),
  //     };
  //   });

  useEffect(() => {
    dispatch(getAuctionData("realtime"));
    console.log("Fetching auction data...");
  }, [dispatch]);

  // useEffect(() => {
  //   const data = fetchCarouselData();
  //   setCarouselData(data);
  //   console.log(data);
  //   const imageUrls = data.map((item) => item.url);
  //   setImages(imageUrls);
  // }, [liveAuctionList]);

  useEffect(() => {
    console.log("liveAuctionList:", liveAuctionList);
  
    if (liveAuctionList && liveAuctionList.length > 0 && carouselData.length === 0) { 
      // liveAuctionList가 비어있지 않고, carouselData가 아직 설정되지 않은 경우에만 실행
      const data = liveAuctionList.map((auction, index) => ({
        url: images[index % images.length], // 로컬 이미지 사용
        title: auction.productName,
        auctionDate: formatDateTime(auction.startingLocalDateTime),
        auctionTime: formatAuctionTimeRange(auction.startingLocalDateTime, auction.endingLocalDateTime),
      }));
      setCarouselData(data);
      console.log("carouselData:", data); // carouselData 확인
    }
  }, [liveAuctionList, images]);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // useEffect(() => {
  //   if (currentIndex >= images.length) {
  //     setTimeout(() => {
  //       setIsTransitioning(false);
  //       setCurrentIndex(0);
  //     }, 500);
  //   } else if (currentIndex < 0) {
  //     setTimeout(() => {
  //       setIsTransitioning(false);
  //       setCurrentIndex(images.length - 1);
  //     }, 500);
  //   }
  // }, [currentIndex, images.length]);

  // const nextSlide = () => {
  //   setIsTransitioning(true);
  //   setCurrentIndex((prevIndex) => prevIndex + 1);
  // };

  // const prevSlide = () => {
  //   setIsTransitioning(true);
  //   setCurrentIndex((prevIndex) => prevIndex - 1);
  // };

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const currentSlideNumber = currentIndex >= images.length ? 0 : currentIndex;
  const currentContent = carouselData[currentIndex];

  const handleSAGoButtonClick = () => {
    navigate('/SpecialAuction'); // SpecialAuction 페이지로 이동
  };

  return (
        <div className="CB_carousel">
          <div
            className="CB_carousel-inner"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
            }}
          >
            {/* { carouselData &&
              carouselData.map((carousel, index) => {
                // console.log(`Loading image: ${carousel.url}`); // URL 로그
                return (
                  <div key={index} className="CB_carousel-item">
                    <img src={carousel.url} alt={`Carousel ${index}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )
              })
            } */}
            {carouselData.map((carousel, index) => (
              <div key={index} className="CB_carousel-item">
                {console.log("Image URL:", carousel.url)}
                <img src={carousel.url} alt={`Carousel ${index}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
          <div className='CB_carousel-pad-container'>
                <div className='CB_carousel-pad1'>
                    <button className='CB_carousel-num'>{currentSlideNumber + 1} / {images.length}</button>
                    <button className="CB_carousel-control prev" onClick={prevSlide}>❮</button>
                    <button className="CB_carousel-control next" onClick={nextSlide}>❯</button>
                    <button className="CB_carousel-toggle" onClick={togglePlayPause}>
                      <img
                          src={`/images/${isPlaying ? 'MP_stop_icon.svg' : 'MP_play_icon.svg'}`}
                          alt={isPlaying ? 'Pause' : 'Play'}
                          style={{ width: '15px', height: '15px' }}
                        />
                    </button>
                </div>
                { currentContent && (
                  <div className="CB_carousel_contents" key={currentIndex}>
                    <div className='CB_carousel_h'>{currentContent.title}</div>
                    <div>
                      <p>{currentContent.auctionDate}</p>
                      <p>{currentContent.auctionTime}</p>
                    </div>
                    <p>실시간 경매 진행 예정</p>
                    <button className="CB_enter_action-button" onClick={handleSAGoButtonClick}>바로가기</button>
                  </div>
                )}
            </div>
        </div>
    );
};

export default CarouselBanner;