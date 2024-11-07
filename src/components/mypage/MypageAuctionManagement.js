import React, { useEffect, useState } from 'react';
import '../../css/Mypage/Mypage.css';
import MypageMyAuctionCard from './MypageMyAuctionCard';
import axios from 'axios';

const MypageAuctionManagement = () => {
  const [myAuctions, setMyAuctions] = useState([]);
  const [selectedAuctionType, setSelectedAuctionType] = useState("일반 경매");

  // 내가 등록한 경매 목록 가져오기
  useEffect(() => {
    const fetchMyAuctions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACK_SERVER}/mypage/my-auctions`, {
          withCredentials: true
        });
        console.log(response.data.items);
        // 서버에서 가져온 경매 리스트를 startingLocalDateTime 기준으로 정렬
        const sortedAuctions = response.data.items.sort((a, b) => {
          return new Date(a.startingLocalDateTime) - new Date(b.startingLocalDateTime);
        });
        setMyAuctions(sortedAuctions); // 정렬된 경매 리스트 설정
      } catch (error) {
        console.error("Failed to fetch my auctions:", error);
      }
    };

    fetchMyAuctions();
  }, []);

  // 선택된 경매 타입에 따른 필터링된 경매 리스트
  const filteredAuctions = myAuctions.filter(
    auction => auction.auctionType === selectedAuctionType
  );

  const handleAuctionDelete = (auctionIndex) => {
    setMyAuctions(myAuctions.filter(auction => auction.auctionIndex !== auctionIndex));
  };

  return (
    <div className='Mypage_AuctionBoxContainer'>
      <div className='Mypage_UserInfoTitle'>
        <h2>내가 등록한 경매</h2>
      </div>
      <div className='Mypage_AuctionMainContainer'>
        <div className='Mypage_AuctionInfoContainer'>
          <div className='Mypage_AuctionCategory'>
            <div className='Mypage_AuctionCategory_Title'>
              <h3>카테고리 선택</h3>
            </div>
          </div>
          <div className='Mypage_AuctionCategoryBtnContainer'>
            <button
              className={`Mypage_AuctionCategoryBtn ${selectedAuctionType === "일반 경매" ? 'active' : ''}`}
              onClick={() => setSelectedAuctionType("일반 경매")}
            >
              <p>일반 경매</p>
            </button>
            <button
              className={`Mypage_AuctionCategoryBtn ${selectedAuctionType === "실시간 경매" ? 'active' : ''}`}
              onClick={() => setSelectedAuctionType("실시간 경매")}
            >
              <p>실시간 경매</p>
            </button>
          </div>
        </div>
        <div className='Mypage_blank' />
        <div className='Mypage_AuctionManagementBar'>
          <div className='Mypage_AuctionManagementImg'>
            <p>대표사진</p>
          </div>
          <div className='Mypage_AuctionManagementTitle'>
            <p>제목</p>
          </div>
          <div className='Mypage_AuctionManagementPrice'>
            <p>현재가</p>
          </div>
          <div className='Mypage_AuctionManagementBid'>
            <p>입찰 단위</p>
          </div>
          <div className='Mypage_AuctionManagementPeriod'>
            <p>경매 기간</p>
          </div>
          <div className='Mypage_AuctionManagementDeleteBtn'></div>
        </div>
        <div className='Mypage_AuctionManagementContinaer'>
          {filteredAuctions.length > 0 ? (
            filteredAuctions.map((auction) => (
              <MypageMyAuctionCard
                key={auction.auctionIndex}
                auction={auction}
                onDelete={handleAuctionDelete} // 삭제 핸들러 추가
              />
            ))
          ) : (
            <div className='Mypage_NoAuctionsMessage'>
              <p>등록된 {selectedAuctionType}가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MypageAuctionManagement;