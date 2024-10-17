import React from 'react';

function AuctionScreen({ formattedCurrentPrice, remainingTime, formattedAuctionEndTime, formattedBidAmount, 
    handleBidIncrease, handleBidDecrease, formattedExpectedPurchasePrice,
    formattedPurchaseFee, handleBidSubmit, messages, messagesEndRef, inputMessage, setInputMessage, handleKeyPress, 
    closeBuyerPopup }) {
  return (
    <div className="SAoverlay">
      <div className='SAtotalPopup'>
        <div className="SAbuyerPopup">
          <div className="SAliveAuctionHeader">
            <h3>Live On</h3>
            <h1>구매자</h1>
            <div className="SAviewerCount">
              <img src='/images/people_icon.svg'></img>
              <p>20,584</p>
            </div>
          </div>
          <div className='SAauctionContainer'>
            <div className="SAauctioncontentBox">
              {/* Product Image Section */}
              <div className="SAproductSection">
                <div className='SAsoundBttn'>
                  <img id='SAsoundOffIcon' src='/images/sound_off_icon.svg'></img>
                  <img id='SAsoundOnIcon' src='/images/sound_on_icon.svg'></img>
                </div>
                <img src="/images/streaming_img.png" alt="Product" className="SAproductImage" />
                <h2>OM + AASTHMA — GAFF - 미드나잇 블루</h2>
              </div>

              {/* Product Information Section */}
              <div className="SAproductInfo">
                <div className="SAauctionInfoBox">
                  <div className="SAauctionInfo">
                    <div className='SAauctionInfoTitle'>
                      <h3>현재가:</h3>
                      <p>남은시간:</p>
                      <p>입찰단위:</p>
                      <p>예상 구매가:</p>
                    </div>
                    <div className='SAauctionInfoContents'>
                      <h3>{formattedCurrentPrice}원</h3>
                      <div className='SAremainingTime'>
                        <p>{remainingTime}</p>
                        <p id='SArealEndTime'>({formattedAuctionEndTime})</p>
                      </div>
                      <p>1,000원</p>
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

              {/* Chat Section */}
              <div className="SAchatContainer">
                <div className="SAchatSection">
                  <div>
                    <ul>
                      {messages.map((msg, index) => (
                        <li key={index}>{msg.user}: {msg.message}</li>
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
                    onKeyPress={handleKeyPress}
                    placeholder="메시지를 입력하세요..."
                  />
                </div>
              </div>

            </div>
          </div>
          <button className="SAtotalBoxCloseButton" onClick={closeBuyerPopup}>
            <img src='/images/white_close_button_icon.svg' alt="close button"/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuctionScreen;
