import React, { useEffect, useRef } from 'react';
import { getFormattedRemainingTime } from '../../util/utils';

function BuyerAuctionScreen({ 
  webSocketProps, auction, remainingTime, closeBuyerPopup, handleShowSellerInfo
}) {

  const { messages, inputMessage, setInputMessage, sendMessage, currentPrice, bidAmount, setBidAmount, handleBidSubmit } = webSocketProps;

  const messagesEndRef = useRef(null);

  const formattedCurrentPrice = currentPrice?.toLocaleString() || '0';

  const auctionEndTime = new Date(auction.endingLocalDateTime);
  const formattedAuctionEndTime = auctionEndTime.toLocaleString('ko-KR'); // 한국어 로케일 적용

  const formattedBidAmount = bidAmount?.toLocaleString() || '0';
  const formattedBidIncrement = auction.bidIncrement?.toLocaleString() || '0'; // 입찰 단위 기본값 처리

  // 구매수수료 계산 (10% 후 1,000단위 내림)
  const calculateFee = (price) => Math.floor((price * 0.1) / 1000) * 1000;

  // 예상 구매가 계산
  const purchaseFee = calculateFee(currentPrice);
  const expectedPurchasePrice = currentPrice + purchaseFee;

  const formattedExpectedPurchasePrice = expectedPurchasePrice?.toLocaleString() || '0';
  const formattedPurchaseFee = purchaseFee?.toLocaleString() || '0';

  // 입찰가 증가 함수
  const handleBidIncrease = () => {
    setBidAmount(bidAmount + auction.bidIncrement);
  }
  
  // 입찰가 감소 함수
  const handleBidDecrease = () => {
    setBidAmount(bidAmount - auction.bidIncrement);
  };

  const formattedRemainingTime = getFormattedRemainingTime(remainingTime);

  // 메시지를 전송하는 핸들러
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };
  
  // 메시지 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="SAoverlay">
      <div className='SAtotalPopup'>
        <div className="SAbuyerPopup">
          <div className="SAliveAuctionHeader">
            <h3>Live On</h3>
            <h1>구매자</h1>
            <div className="SAviewerCount">
              <img src='/images/people_icon.svg' alt="Viewer Count" />
              <p>20,584</p>
            </div>
          </div>
          <div className='SAauctionContainer'>
            <div className="SAauctioncontentBox">
              {/* Product Image Section */}
              <div className="SAproductSection">
                <div className='SAsoundBttn'>
                  <img id='SAsoundOffIcon' src='/images/sound_off_icon.svg' alt="Sound Off" />
                  <img id='SAsoundOnIcon' src='/images/sound_on_icon.svg' alt="Sound On" />
                </div>
                <img src="/images/streaming_img.png" alt="Product" className="SAproductImage" />
                <h2>{auction.productName}</h2>
              </div>

              {/* Product Information Section */}
              <div className="SAproductInfo">
                <div className="SAsellerInfo">
                  <div className='SAsellerProfile'>
                    <img src='/images/seller_img.svg' alt="Seller Profile" />
                    <div>
                      <h3>{auction.memberNickname}</h3>
                      <p>Seller</p>
                    </div>
                  </div>
                  <div className='SAsellerMainInfo'>
                    <div>
                      <p>판매 건수</p>
                      <p>186</p>
                    </div>
                    <div>
                      <p>총 평가 점수</p>
                      <p>4.9</p>
                    </div>
                    <div>
                      <p>주 판매 목록</p>
                      <p>신발</p>
                    </div>
                  </div>
                  <div className='SAsellerEvaluation'>
                    <div className='SAsellerEvaluationDetail'>
                      <p>상품에 대한 설명</p>
                      <p>배송 속도</p>
                      <p>응답 속도</p>
                      <p>친절도</p>
                    </div>
                    <div className='SAsellerEvaluationDetail'>
                      <progress className='SAprogress' value="100" min="0" max="100"></progress>
                      <progress className='SAprogress' value="90" min="0" max="100"></progress>
                      <progress className='SAprogress' value="100" min="0" max="100"></progress>
                      <progress className='SAprogress' value="100" min="0" max="100"></progress>
                    </div>
                    <div className='SAsellerEvaluationDetail'>
                      <p>5.0</p>
                      <p>4.8</p>
                      <p>5.0</p>
                      <p>5.0</p>
                    </div>
                  </div>
                  <div className='SAmoreInfoButtonBox'>
                    <button className="SAmoreInfoButton" onClick={handleShowSellerInfo}>판매자 정보 더보기</button>
                  </div>
                </div>

                <div className="SAauctionInfoBox">
                  <div className="SAauctionInfo">
                    <div className='SAauctionInfoTitle'>
                      <h3>현재가:</h3>
                      <p>남은시간:</p>
                      <p>경매번호:</p>
                      <p>입찰단위:</p>
                      <p>희망 입찰가:</p>
                      <p>예상 구매가:</p>
                    </div>
                    <div className='SAauctionInfoContents'>
                      <h3>{formattedCurrentPrice}원</h3>
                      <div className='SAremainingTime'>
                        <p>{formattedRemainingTime}</p>
                        <p id='SArealEndTime'>({formattedAuctionEndTime})</p>
                      </div>
                      <p>{auction.auctionIndex}</p>
                      <p>{formattedBidIncrement}원</p>
                      <div className='SAbidBox'>
                        <input type="text" id="SAbidInput" value={formattedBidAmount} readOnly /> <p>원</p>
                        <div className='SAbidButtonBox'>
                          <button onClick={handleBidIncrease} className="SAbidButton">+</button>
                          <button onClick={handleBidDecrease} className="SAbidButton">-</button>
                        </div>
                      </div>
                      <div className='SAexpectedPurchase'>
                        <p>{formattedExpectedPurchasePrice}원</p>
                        <p id='SAexpectedPurchaseCalc'>({formattedCurrentPrice}원 + 구매수수료 {formattedPurchaseFee}원)</p>
                      </div>
                    </div>
                  </div>
                  <div className='SAbidSubmitButtonBox'>
                    <button className="SAbidSubmitButton" onClick={handleBidSubmit}>입찰하기</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Section */}
            <div className="SAchatContainer">
              <div className="SAchatSection">
                <div>
                  <ul>
                    {messages.map((msg, index) => (
                      <li key={index}>{msg.senderNickname}: {msg.chatMessage}</li>
                    ))}
                    <div ref={messagesEndRef} />
                  </ul>
                </div>
              </div>
              <div>
                <input
                  className='SAchatInput'
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="메시지를 입력하세요..."
                />
              </div>
            </div>

          </div>    
        </div>
        <button className="SAtotalBoxCloseButton" onClick={closeBuyerPopup}>
          <img src='/images/white_close_button_icon.svg' alt="close button" />
        </button>
      </div>
    </div>
  );
}

export default BuyerAuctionScreen;
