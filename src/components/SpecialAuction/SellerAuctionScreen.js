import React, { useEffect, useRef } from 'react';
import { getFormattedRemainingTime } from '../../util/utils';

function SellerAuctionScreen({ 
  webSocketProps, auction, remainingTime, closeSellerPage
}) {

  const { messages, inputMessage, setInputMessage, sendMessage, currentPrice } = webSocketProps;

  const messagesEndRef = useRef(null);


  const auctionStartTime = new Date(auction.startingLocalDateTime);
  const formattedAuctionStartTime = auctionStartTime.toLocaleString('ko-KR'); // 한국어 포맷으로 변경
  const formattedBidIncrement = auction.bidIncrement?.toLocaleString() || '0'; // null/undefined 대비 기본값 처리
  const formattedStartingPrice = auction.startingPrice?.toLocaleString() || '0';

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
          <div className="SAsellerLiveAuctionHeader">
            <h3>Live Off</h3>
            <h1>판매자</h1>
          </div>
          <div className='SAauctionContainer'>
            <div className='SAsellerTotalBox'>
              <div className='SAsellerViewBox'>
                <div className="SAsellerAuctionContentBox">
                  <div className="SAsellerProductSection">
                    <div className='SAsoundBttn'>
                      <img id='SAmikeOffIcon' src='/images/mike_off_icon.svg' alt="Mic Off" />
                      <img id='SAmikeOnIcon' src='/images/mike_on_icon.svg' alt="Mic On" />
                    </div>
                    <img src="/images/streaming_img.png" alt="Product" className="SAsellerProductImage" />
                  </div>

                  <div className="SAsellerAuctionDetails">
                    <h2>{auction.productName}</h2>
                    <div className='SAsellerAuctionDetailsBox'>
                      <div className='SAsellerAuctionContentsTitle'>
                        <p>경매 시작까지<br />남은 시간</p>
                        <p>입찰단위</p>
                        <p>경매 시작가</p>
                        <p>대기중인 사용자</p>
                      </div>
                      <div className='SAsellerAuctionContentsValue'>
                        <div>
                          <p id='SAsellerAuctionStartRemainTimeDiff'>{formattedRemainingTime}</p>
                          <p id='SAsellerAuctionStartRemainTime'>({formattedAuctionStartTime})</p>
                        </div>
                        <p>{formattedBidIncrement}원</p>
                        <p>{formattedStartingPrice}원</p>
                        <p>20,584</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="SAsellerStreamingInfo">
                  <p id='SAsellerStreamingNote'>* 경매 시간이 되면 자동으로 스트리밍을 시작합니다.</p>
                  <p id='SAsellerStreamingNoteContent'>실시간 스트리밍을 시작하려면 스트리밍 소프트웨어에서 동영상 전송을 시작하세요.</p>
                </div>
              </div>

              {/* Chat Section */}
              <div className="SAsellerChatContainer">
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
          <button className="SAtotalBoxCloseButton" onClick={closeSellerPage}>
            <img src='/images/white_close_button_icon.svg' alt="close button" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SellerAuctionScreen;
