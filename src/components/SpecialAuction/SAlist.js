import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAuctionData } from '../../apis/SpecialAuction/SAapis'; 
import SAitem from './SAitem';
import socket from '../../socket/socket';
import '../../css/SpecialAuction/SAlist.css';

function SAlist({activeTab}) {
  const [nickname, setNickname] = useState('User'); // 기본 닉네임은 'User'
  const [messages, setMessages] = useState([]); // 채팅 메시지 배열 상태
  const [inputMessage, setInputMessage] = useState(''); // 채팅 입력 메세지 상태
  const [showBuyerPopup, setShowBuyerPopup] = useState(false); // 구매자 페이지 로딩 팝업 상태
  const [showSellerInfoPopup, setShowSellerInfoPopup] = useState(false); // 판매자 정보 더보기 팝업 상태
  const [showBidConfirmationPopup, setShowBidConfirmationPopup] = useState(false); // 입찰 확인 팝업 상태
  const [showEndPopup, setShowEndPopup] = useState(false); // 경매 종료 안내 팝업 상태
  const [bidAmountToConfirm, setBidAmountToConfirm] = useState(''); // 확인 팝업에 표시할 입찰 금액
  const [showSellerPopup, setShowSellerPopup] = useState(false); // 판매자 페이지 팝업 상태
  const [showAuctionScreen, setShowAuctionScreen] = useState(false); // 경매 화면 팝업 상태
  const [showAlertPopup, setShowAlertPopup] = useState(false);
  const [selectedAuctionTitle, setSelectedAuctionTitle] = useState('');
  const [remainingTime, setRemainingTime] = useState('');
  const [hasAuctionEnded, setHasAuctionEnded] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(735000); // 현재가 (최초 현재가 설정)
  const [bidAmount, setBidAmount] = useState(736000); // 입찰가 상태
  const [isUserSeller, setIsUserSeller] = useState(false);

  const messagesEndRef = useRef(null); // 메세지 채팅 내용 마지막 위치

  const dispatch = useDispatch();
  
  const { liveAuctionList, blindAuctionList} = useSelector((state) => state.specialAuctionSlice);

  // 컴포넌트가 마운트될 때 경매 데이터를 가져오는 디스패치 호출
  useEffect(() => {
    dispatch(getAuctionData('realtime')); // 'live' 경매 데이터를 가져오는 액션 디스패치
  }, [dispatch]);


  const formatDateTime = (startDateTime, endDateTime) => {
    // startDateTime과 endDateTime을 Date 객체로 변환
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);

    // 날짜 형식 변환
    const formattedDate = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(start);

    // 시간 형식 변환
    const formattedStartTime = start.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    const formattedEndTime = end.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    return {
        date: formattedDate.replace(/-/g, '.'),
        time: `${formattedStartTime} ~ ${formattedEndTime}`
    };
  };

  // 실시간/블라인드 경매 리스트 렌더링
  const renderAuctions = () => {

    const auctionList = activeTab === 'realtime' ? liveAuctionList : blindAuctionList; 
    const auctionType = activeTab === 'realtime' ? '실시간 경매' : '블라인드 경매';

    return auctionList && auctionList.length > 0 ? (
      <div className="SAauctionList">
        {auctionList.map((item, index) => {

          const thumbnailImage = item.auctionImageDtoList.find(image => image.isThumbnail === true);

          // 이미지가 있고 파일 타입이 'image'인 경우, 썸네일 경로를 생성
          const imageSrc = thumbnailImage && thumbnailImage.filetype === 'image'
            ? `https://kr.object.ncloudstorage.com/bitcamp121/${thumbnailImage.filepath}${thumbnailImage.filename}`
            : '/images/defaultFileImg.png';  // 썸네일이 없거나 이미지 파일이 아닌 경우 기본 이미지 사용

          // 날짜와 시간을 포맷팅
          const { date, time } = formatDateTime(item.startingLocalDateTime, item.endingLocalDateTime);

          return (
            <SAitem
              key={index}
              imageSrc={imageSrc} // 받는거랑 보내는거 여기 파라미터랑 dto 랑 이름 맞춰주기
              title={item.productName} 
              auctionDate={date} // 날짜 포맷팅 값 전달
              auctionTime={time} // 시간 포맷팅 값 전달
              handleGoButtonClick={() => handleGoButtonClick(item.id)}
              handleAlertButtonClick={() => handleAlertButtonClick(item.id)}
            />
        )
      })
     }
      </div>
    ) : (
      <div className="SAnoAuction">
        <p>현재 진행중인 {auctionType}가 없습니다.</p>
        <p>추후 진행하게 될 {auctionType}에서 만나요!</p>
      </div>
    );
  };

  const handleGoButtonClick = () => {
    const now = new Date();
    if (hasAuctionEnded || now > auctionEndTime) {
      setShowEndPopup(true); // 경매 종료 팝업 띄우기
      return;
    }

    if (isUserSeller === true) {
      setShowSellerPopup(true);
    } else {
      if (now < auctionStartTime) {
        setShowBuyerPopup(true);
      } else {
        setShowAuctionScreen(true);
      }
    }
  };

  // 알림신청 버튼을 눌렀을 때 팝업을 표시하는 함수
  const handleAlertButtonClick = (title) => {
    setSelectedAuctionTitle(title);
    setShowAlertPopup(true);
  };

  // 경매 시작 시간 설정
  const auctionStartTime = new Date('2024-10-15T12:00:00');
  const formattedAuctionStartTime = auctionStartTime.toLocaleString();
  
  // 경매 종료 시간 설정
  const auctionEndTime = new Date('2024-10-16T12:00:00');
  const formattedAuctionEndTime = auctionEndTime.toLocaleString();

  // 시간 차이를 시간, 분, 초로 변환하는 함수
  const formatTimeDifference = (timeDiff) => {
    const seconds = Math.floor((timeDiff / 1000) % 60);
    const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    return `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
  };

  // 현재 시간과의 차이 계산
  const now = new Date();
  const timeDifference = auctionEndTime - now;
  const formattedTimeDifference = formatTimeDifference(timeDifference);

  // 팝업을 닫는 함수
  const handleClosePopup = () => {
    setShowAlertPopup(false);
  };

  // 메시지가 변경될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // 메시지 수신 처리
  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // 컴포넌트 언마운트 시 이벤트 리스너 정리
    return () => socket.off('receiveMessage');
  }, []);

  // 닉네임 자동 설정 (판매자 페이지 여부에 따라 변경)
  useEffect(() => {
    if (showSellerPopup) {
      setNickname('판매자'); // 판매자 페이지로 이동하면 닉네임 설정
    } else {
      setNickname('User'); // 그 외에는 'User'
    }
  }, [showSellerPopup]);
  
  // 메시지 전송 핸들러
  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      // 새로운 메시지 추가
      const messageData = { user: nickname, message: inputMessage }; // 닉네임 사용
      setMessages((prevMessages) => [...prevMessages, messageData]);
      socket.emit('sendMessage', messageData); // 서버로 메시지 전송
      setInputMessage(''); // 인풋 비우기
    }
  };

  // Enter 키로 전송 가능하게 하는 핸들러
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // 구매자 페이지 팝업 닫기
  const closeBuyerPopup = () => {
    setShowBuyerPopup(false);
    setShowAuctionScreen(false);
  };

  const handleShowSellerInfo = () => {
    setShowSellerInfoPopup(true); // 판매자 정보 팝업 표시
  };
  
  const handleCloseSellerInfoPopup = () => {
    setShowSellerInfoPopup(false); // 판매자 정보 팝업 닫기
  };

  // 판매자 페이지 닫기
  const closeSellerPage = () => setShowSellerPopup(false);

  const handleBidIncrease = () => setBidAmount(bidAmount + 1000);
  const handleBidDecrease = () => setBidAmount(bidAmount - 1000);

  const handleCloseEndPopup = () => {
    setShowEndPopup(false); // 경매 마감 팝업 닫기
  };

  // 입찰 버튼 클릭 시 현재가 업데이트
  const handleBidSubmit = () => {
    if (bidAmount > currentPrice) {
      setBidAmountToConfirm(bidAmount); // 입력한 입찰 금액 저장
      setShowBidConfirmationPopup(true); // 입찰 확인 팝업 표시
    } else {
      alert('입찰가는 현재가보다 높아야 합니다.');
    }
  };

  const confirmBid = () => {
    // 입찰 확정 로직 (서버에 입찰 요청 보내기 등)
    setCurrentPrice(bidAmountToConfirm); // 현재가를 입찰 금액으로 업데이트
    setShowBidConfirmationPopup(false); // 팝업 닫기
  };
  
  const handleCloseBidConfirmationPopup = () => {
    setShowBidConfirmationPopup(false); // 팝업 닫기
  };

  // 구매수수료 계산 (10% 후 1,000단위 내림)
  const calculateFee = (price) => Math.floor((price * 0.1) / 1000) * 1000;

  // 예상 구매가 계산
  const purchaseFee = calculateFee(currentPrice);
  const expectedPurchasePrice = currentPrice + purchaseFee;

  // 포맷된 금액들(금액에 1000단위 , 추가)
  const formattedBidAmount = bidAmount.toLocaleString();
  const formattedCurrentPrice = currentPrice.toLocaleString();
  const formattedPurchaseFee = purchaseFee.toLocaleString();
  const formattedExpectedPurchasePrice = expectedPurchasePrice.toLocaleString();
  const formattedbidAmountToConfirm = bidAmountToConfirm.toLocaleString();

  useEffect(() => {
    // 타이머 설정
    const interval = setInterval(() => {
      const now = new Date();
      const timeDifference = auctionEndTime - now;
  
      setRemainingTime(formatTimeDifference(timeDifference));
  
      // 경매 시간이 종료되었는지 체크하여 상태만 업데이트
      if (timeDifference <= 0 && !hasAuctionEnded) {
        setHasAuctionEnded(true); // 경매 종료로 설정
        clearInterval(interval); // 타이머 정리
      }
    }, 1000);
  
    return () => {
      clearInterval(interval); // 정리
    };
  }, [hasAuctionEnded]);

  return (
    <div className="SAauctionList">
      {/*status === 'succeeded' &&*/ renderAuctions()}

        {/* 알림신청 팝업 */}
        {showAlertPopup && (
        <div className="SAalertOverlay">
          <div className="SAalertPopup">
            <h2>알림신청</h2>
            <p>
              <strong>{selectedAuctionTitle}</strong>의 실시간 경매 알림을 신청하시겠습니까?
            </p>
            <p>알림신청 취소는 <span>마이페이지</span>에서 가능합니다.</p>
            <p>
              <small>* 경매 시작 1일 전과 30분 전에 이메일과 해당 사이트 알림을 통해서 전달됩니다.</small>
            </p>
            <button onClick={handleClosePopup}>확인</button>
          </div>
        </div>
      )}

        {/* 구매자 로딩 팝업 */}
        {showBuyerPopup && !showAuctionScreen && (
        <div className="SAoverlay">
          <div className="SAwaitPopup">
            <div className='SAliveOnOffBox'>
              <h3>Live Off</h3>
            </div>
            <div className='SAbuyerWaitCommnetBox'>
              <h1>20,568명 대기중...</h1>
              <p>곧 실시간 경매가 시작될 예정입니다.</p>
              <p>잠시만 대기 해주시면 곧 경매가 시작됩니다.</p>
            </div>
            <button className="SAcloseButton" onClick={closeBuyerPopup}>
              <img src='/images/white_close_button_icon.svg' alt="close button"/>
            </button>
          </div>
        </div>
      )}

      {/* 구매자 경매 화면 */}
      { showAuctionScreen && (
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
                  {/* 기존 경매 화면 구성 */}
                  {/* 경매 화면의 나머지 내용 */}
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
                    <div className="SAsellerInfo">
                      <div className='SAsellerProfile'>
                        <img src='/images/seller_img.svg'></img>
                        <div>
                          <h3>Gooood_good </h3>
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
                            <p>{remainingTime}</p> 
                            <p id='SArealEndTime'>({formattedAuctionEndTime})</p>
                          </div>
                          <p>23478023124</p>
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
                </div>

                {/* Chat Section */}
                <div className="SAchatContainer">
                  <div className="SAchatSection">
                    <div>
                      <ul>
                        {messages.map((msg, index) => (
                          <li key={index}>{msg.user}: {msg.message}</li>
                        ))}
                        {/* 이 div가 스크롤을 맨 아래로 이동시키는 역할 */}
                        <div ref={messagesEndRef} />
                      </ul>
                    </div>
                  </div>
                  <div>
                    {/* 채팅 입력 */}
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
      )}

        {/* 판매자 정보 더보기 화면 */}
        {showSellerInfoPopup && (
        <div className="SAoverlay">
          <div className="SAsellerInfoPopup">
            <h2>판매자 정보 더보기</h2>
            <table>
              <tbody>
                <tr>
                  <td>판매자 아이디</td>
                  <td>Crown_Bid</td>
                </tr>
                <tr>
                  <td>전화번호</td>
                  <td>010-9578-2453</td>
                </tr>
                <tr>
                  <td>E-mail</td>
                  <td>bit@bitcamp.com</td>
                </tr>
                <tr>
                  <td>상호명</td>
                  <td>크라운비드</td>
                </tr>
                <tr>
                  <td>사업자 구분</td>
                  <td>일반사업자</td>
                </tr>
                <tr>
                  <td>통판매일 신고</td>
                  <td>2022-경기군포-0226</td>
                </tr>
                <tr>
                  <td>사업자등록번호</td>
                  <td>875-12-10239</td>
                </tr>
                <tr>
                  <td>대표자</td>
                  <td>홍길동</td>
                </tr>
                <tr>
                  <td>영업 소재지</td>
                  <td>경기도 안양시 만안구 시민대로 35번길 41(안양동)</td>
                </tr>
              </tbody>
            </table>
            <button className='SAendOkbttn' onClick={handleCloseSellerInfoPopup}>확인</button>
          </div>
        </div>
      )}

      {/* 입찰하기 경고 확인 화면 */}
      {showBidConfirmationPopup && (
        <div className="SAoverlay">
          <div className="SAbidConfirmationPopup">
            <div className='SAbidConfirmationHeader'>
              <img src='../../../images/bid_confirm_alert_icon.svg'></img>
              <h2>입찰확인</h2>
            </div>
            <div className='SAbidConfirmationContour'></div>
            <p>
              {formattedbidAmountToConfirm} 원으로 입찰하시겠습니까?
            </p>
            <div className='SAbidConfirmationContour'></div>
            <div className="SAbidConfirmationButtons">
              <button onClick={confirmBid}>입찰하기</button>
              <button onClick={handleCloseBidConfirmationPopup}>취소</button>
            </div>
          </div>
        </div>
      )}

      {/* 판매자 경매 화면 */}
      {showSellerPopup && (
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
                      {/* 기존 경매 화면 구성 */}
                      {/* 경매 화면의 나머지 내용 */}
                      {/* Product Image Section */}
                      <div className="SAsellerProductSection">
                        <div className='SAsoundBttn'>
                          <img id='SAmikeOffIcon' src='/images/mike_off_icon.svg'></img>
                          <img id='SAmikeOnIcon' src='/images/mike_on_icon.svg'></img>
                        </div>
                        <img src="/images/streaming_img.png" alt="Product" className="SAsellerProductImage" />
                      </div>

                      <div className="SAsellerAuctionDetails">
                        <h2>OM + AASTHMA — GAFF - 미드나잇 블루</h2>
                        <div className='SAsellerAuctionDetailsBox'>
                          <div className='SAsellerAuctionContentsTitle'>
                            <p>경매 시작까지<br/>남은 시간</p>
                            <p>입찰단위</p>
                            <p>현재가</p>
                            <p>경매 시작가</p>
                            <p>대기중인 사용자</p>
                          </div>
                          <div className='SAsellerAuctionContentsValue'>
                            <div>
                              <p id='SAsellerAuctionStartRemainTimeDiff'>{formattedTimeDifference}</p>
                              <p id='SAsellerAuctionStartRemainTime'>({formattedAuctionStartTime})</p>
                            </div>
                            <p>1000원</p>
                            <p>735,000원</p>
                            <p>735,000원</p>
                            <p>20,584</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="SAsellerStreamingInfo">
                      <p id='SAsellerStreamingNote'>* 경매 시간이 되면 자동으로 스트리밍을 시작합니다.</p>
                      <p id='SAsellerStreamingNoteContent'>실시간 스트리밍을 시작하려면 스트리밍 소프트웨어에서 ____로 동영상을 전송을 시작하세요.</p>
                    </div>
                    <div className='SAsellerSteamingBox'>
                    </div>
                  </div>
                
                  {/* Chat Section */}
                  <div className="SAsellerChatContainer">
                    <div className="SAchatSection">
                      <div>
                        <ul>
                          {messages.map((msg, index) => (
                            <li key={index}>{msg.user}: {msg.message}</li>
                          ))}
                          {/* 이 div가 스크롤을 맨 아래로 이동시키는 역할 */}
                          <div ref={messagesEndRef} />
                        </ul>
                      </div>
                    </div>
                    <div>
                      {/* 채팅 입력 */}
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
            </div>
            <button className="SAtotalBoxCloseButton" onClick={closeSellerPage}>
              <img src='/images/white_close_button_icon.svg' alt="close button"/>
            </button>
          </div>
        </div>
      )}

      {/* 경매 종료 팝업 */}
      {showEndPopup && (
        <div className="SAoverlay">
          <div className='SAtotalPopup'>
            <div className="SAendPopup">
              <h2>경매 마감 안내</h2>
              <p>OM + AASTHMA — GAFF - 미드나잇 블루 <br/>상품의 실시간 경매가 마감되었습니다.</p>
              <p id='SAsuccessfulBidderName'>최종 낙찰자 : **낙찰자 이름**님</p>
              <p id='SAsuccessfulBidderPrice'>낙찰 금액 : **낙찰 금액**원</p>
              <p id='SAendAuctionMent'>참여해 주신 모든 분들께 감사드리며, <br/> 다음 경매에도 많은 관심 부탁드립니다!</p>
              <button className='SAendOkbttn' onClick={handleCloseEndPopup}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SAlist;