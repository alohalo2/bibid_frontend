import React, { useState, useEffect } from 'react';
import '../../css/CarouselBanner.css';

const CarouselBanner = () => {
  const originalImages = [
    'https://static.coupangcdn.com/oa/cmg_paperboy/image/1727675434772/%5BPC%5DC1_crop.jpg',
    'https://static.coupangcdn.com/sa/cmg_paperboy/image/1727685824246/1920_45014.jpg',
    'https://static.coupangcdn.com/da/cmg_paperboy/image/1727682261113/C1-PC1.jpg',
  ];
  const images = [originalImages[originalImages.length - 1], ...originalImages, originalImages[0]];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(images.length - 2);
      }, 500);
    } else if (currentIndex === images.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 500);
    }
  }, [currentIndex, images.length]);

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const currentSlideNumber = currentIndex === 0 ? images.length - 2 : currentIndex === images.length - 1 ? 1 : currentIndex;

  return (
    <div className="CB_carousel">
      <div
        className="CB_carousel-inner"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="CB_carousel-item"
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>
      <div className='CB_carousel-pad-container'>
            <div className='CB_carousel-pad1'>
                <button className='CB_carousel-num'>{currentSlideNumber} / 3</button>
                <button className="CB_carousel-control prev" onClick={prevSlide}>❮</button>
                <button className="CB_carousel-control next" onClick={nextSlide}>❯</button>
                <button className="CB_carousel-toggle" onClick={togglePlayPause}>
                    {isPlaying ? '||' : '▶'}
                </button>
            </div>
        </div>
    </div>
  );
};

export default CarouselBanner;