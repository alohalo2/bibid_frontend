  import React, { useState, useEffect } from 'react';
  import { useSelector, useDispatch } from 'react-redux';
  import { getAuctionData } from '../../apis/SpecialAuction/SAapis';
  import {   formatDateTime , formatAuctionTimeRange  } from '../../util/utils';
  import useWebSocket from '../../customHooks/useWebSocket';
  import '../../css/SpecialAuction/SAlist.css';

  // 팝업 및 화면 컴포넌트
  import AlertPopup from './AlertPopup';
  import BuyerWaitPopup from './BuyerWaitPopup';
  import BuyerAuctionScreen from './BuyerAuctionScreen';
  import SellerAuctionScreen from './SellerAuctionScreen';
  import SellerInfoPopup from './SellerInfoPopup';
  import BidConfirmationPopup from './BidConfirmationPopup';
  import AuctionEndPopup from './AuctionEndPopup';
  import SAitem from './SAitem';

  function SAlist({ activeTab }) {

    const dispatch = useDispatch();

    // 경매 데이터를 가져오는 디스패치 호출
    useEffect(() => {
      dispatch(getAuctionData(activeTab));
    }, [dispatch]);

    const { liveAuctionList, blindAuctionList } = useSelector((state) => state.specialAuctionSlice);
    const loginMemberNickname = useSelector((state) => state.memberSlice.nickname);
    const [selectedAuction, setSelectedAuction] = useState(null);
    const [remainingTime, setRemainingTime] = useState('');
    const [hasAuctionEnded, setHasAuctionEnded] = useState(false);
    const [isChatClosed, setIsChatClosed] = useState(true);

    const webSocketProps = useWebSocket(selectedAuction?.auctionIndex, isChatClosed, setIsChatClosed);

    const [popupState, setPopupState] = useState({
      showBuyerPopup: false,
      showSellerInfoPopup: false,
      showBidConfirmationPopup: false,
      showEndPopup: false,
      showBuyerAuctionScreen: false,
      showSellerAuctionScreen: false,
      showAlertPopup: false,
    });

    // 팝업 열기/닫기 함수
    const togglePopup = (popupName, value) => setPopupState((prev) => ({ ...prev, [popupName]: value }));

    // 옥션 리스트 렌더링 함수
    const renderAuctions = () => {
      const auctionList = activeTab === 'realtime' ? liveAuctionList : blindAuctionList;
      const auctionType = activeTab === 'realtime' ? '실시간 경매' : '블라인드 경매';

      return auctionList.length > 0 ? (
        <div className="SAauctionList">
          {auctionList.map((auction, index) => {
            const thumbnailImage = auction.auctionImageDtoList.find((image) => image.thumbnail === true);
            const imageSrc = thumbnailImage
              ? `https://kr.object.ncloudstorage.com/bitcamp121/${thumbnailImage.filepath}${thumbnailImage.filename}`
              : '/images/defaultFileImg.png';

            return (
              <SAitem
                key={index}
                imageSrc={imageSrc}
                title={auction.productName}
                auctionDate={formatDateTime(auction.startingLocalDateTime)}
                auctionTime={formatAuctionTimeRange(auction.startingLocalDateTime, auction.endingLocalDateTime)}
                linkText="바로가기"
                alertText="* 알림은 경매 시작 30분 전에 발송됩니다."
                handleGoButtonClick={() => handleGoButtonClick(auction)}
                handleAlertButtonClick={() => togglePopup('showAlertPopup', true)}
              />
            );
          })}
        </div>
      ) : (
        <div className="SAnoAuction">
          <p>현재 진행중인 {auctionType}가 없습니다.</p>
          <p>추후 진행하게 될 {auctionType}에서 만나요!</p>
        </div>
      );
    };


    const handleGoButtonClick = (auction) => {
      setSelectedAuction(auction);
      webSocketProps.setCurrentPrice(auction.startingPrice);
      webSocketProps.setBidAmount(auction.startingPrice);
    
      const now = new Date();
      const auctionEndTime = new Date(auction.endingLocalDateTime);
      const auctionStartTime = new Date(auction.startingLocalDateTime);
      
      const userIsSeller = auction.memberNickname === loginMemberNickname;
    
      if (hasAuctionEnded || now > auctionEndTime) {
        togglePopup('showEndPopup', true); // 경매 종료 팝업
        return;
      }
    
      if (userIsSeller) {
        togglePopup('showSellerAuctionScreen', true); // 판매자 경매 화면 열기
      } else {
        if (now < auctionStartTime) {
          togglePopup('showBuyerPopup', true); // 구매자 대기 팝업
        } else {
          togglePopup('showBuyerAuctionScreen', true); // 구매자 경매 화면 열기
        }
      }
    };
    
    useEffect(() => {
      if (selectedAuction) {
        const interval = setInterval(() => {
          const now = new Date();
          const auctionEndTime = new Date(selectedAuction.endingLocalDateTime);
          const timeDifference = auctionEndTime - now;
    
          if (timeDifference > 0) {
            setRemainingTime(timeDifference);
          } else {
            setHasAuctionEnded(true);
            clearInterval(interval);
          }
        }, 1000);
    
        return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 정리
      }
    }, [selectedAuction, hasAuctionEnded]);
  

    return (
      <div className="SAauctionList">
        {renderAuctions()}
        {/* 팝업 컴포넌트들 */}
        {popupState.showAlertPopup && <AlertPopup auction={selectedAuction} handleClosePopup={() => togglePopup('showAlertPopup', false)} />}
        {popupState.showBuyerPopup && !popupState.showBuyerAuctionScreen && <BuyerWaitPopup handleClosePopup={() => togglePopup('showBuyerPopup', false)} />}
        {popupState.showBuyerAuctionScreen && <BuyerAuctionScreen webSocketProps = {webSocketProps} auction={selectedAuction} remainingTime={remainingTime} handleShowSellerInfo={() => togglePopup('showSellerInfoPopup', true) } closeBuyerPopup={() => {togglePopup('showBuyerAuctionScreen', false); setIsChatClosed(true);}} />}
        {popupState.showSellerAuctionScreen && <SellerAuctionScreen webSocketProps = {webSocketProps} auction={selectedAuction} remainingTime={remainingTime} closeSellerPage={() => {togglePopup('showSellerAuctionScreen', false); setIsChatClosed(true);}} />}
        {popupState.showSellerInfoPopup && <SellerInfoPopup auction={selectedAuction} handleClosePopup={() => togglePopup('showSellerInfoPopup', false)} />}
        {popupState.showBidConfirmationPopup && <BidConfirmationPopup bidAmount={webSocketProps.bidAmount} handleClosePopup={() => togglePopup('showBidConfirmationPopup', false)} />}
        {popupState.showEndPopup && <AuctionEndPopup auction={selectedAuction} handleClosePopup={() => togglePopup('showEndPopup', false)} />}
      </div>
    );

  }

  export default SAlist;
