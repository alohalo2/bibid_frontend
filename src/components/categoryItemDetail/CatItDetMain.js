import React, { useState } from 'react';
import '../../css/CategoryItemDetail.css';
import img1 from '../../images/img1.png';
import img2 from '../../images/img2.png';
import img3 from '../../images/img3.png';
import img4 from '../../images/img4.png';
import img5 from '../../images/img5.png';
import Modal from 'react-modal';
// material ui 아이콘 불러오기
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { IconButton } from '@mui/material';

const CatItDetMain = ({ auctionNumber, auctionItem, auctionInfo, seller }) => {

  console.log(auctionNumber, auctionItem, auctionInfo, seller);
  // // 경매 Index
  // const auctionIndex = auctionItem.auctionIndex;
  // // 맴버 index
  // const memberIndex = auctionItem.memberIndex;
  // // 경매 타입
  // const auctionType = auctionItem.auctionType;
  // // 카테고리
  // const category = auctionItem.category;
  // // 세부 카테고리
  // const subcategory = auctionItem.subcategory;
  // // 물품 제목 , 이름
  // const productName = auctionItem.productName;
  // // 물품 설명
  // const productDescription = auctionItem.productDescription;
  
  // // 썸네일이미지
  
  // // const 진행중인 경매수

  // // const 경매진행자 sellerName

  // // 경매 시작가
  // const startingPrice = auctionItem.startingPrice;
  // // 경매 시작시간
  // const starting_LocalDateTime = auctionItem.starting_LocalDateTime;
  // // 경매 종료시간
  // const ending_LocalDateTime = auctionItem.endting_LocalDateTime;
  // // 입찰단위
  // const bidIncreasement = auctionItem.bidIncreasement;
  // // 즉시구매 가격
  // const instantPurchasePrice = auctionItem.instantPurchasePrice
  // // 재경매 시작가
  // const reauctionStartingPrice = auctionItem.reauctionStartingPrice
  // // 경매 상태
  // const auctionStatus = auctionItem.auctionStatus;
  // // 조회수
  // const viewCnt = auctionItem.viewCnt;
  // // 경매 등록시간 - board의 regdate
  // const regdate = auctionItem.regdate;
  // // 경매 수정시간 - board의 moddate
  // const moddate = auctionItem.moddate;
  

  // 판매자 정보 더 보기 모달창
  const [sellerModalOpen, setSellerModalOpen] = useState(false);
  const openSellerModal = () => {
    setSellerModalOpen(true);
  };
  const closeSellerModal = () => {
    setSellerModalOpen(false);
  };

  // 입찰 기록 보기 모달창
  const [biddingRecordModalOpen, setBiddingRecordModalOpen] = useState(false);
  const openBiddingRecordModal = () => {
    setBiddingRecordModalOpen(true);
  };
  const closeBiddingRecordModal = () => {
    setBiddingRecordModalOpen(false);
  };
  // 입찰 기록보기 모달에서 사용할 입찰 기록 데이터
  const biddingRecords = [
    { date: '2024-09-02 18:47', bidder: '3번 입찰자', amount: '56,000 원' },
    { date: '2024-09-01 11:28', bidder: '2번 입찰자', amount: '55,000 원' },
    { date: '2024-09-01 08:53', bidder: '1번 입찰자', amount: '52,000 원' },
  ];
  // 다음 백엔드 로직으로 교체될거임
  // 입찰 기록 데이터 상태 관리
  // const [biddingRecords, setBiddingRecords] = useState([]);
  // const [loading, setLoading] = useState(true);  // 로딩 상태
 
  // // 백엔드에서 입찰 기록 데이터를 가져오기
  // useEffect(() => {
  //   const fetchBiddingRecords = async () => {
  //     try {
  //       const response = await fetch('/api/bidding-records');  // 백엔드 API 엔드포인트
  //       const data = await response.json();  // JSON 형식의 응답을 파싱
  //       setBiddingRecords(data);  // 가져온 데이터를 상태에 저장
  //       setLoading(false);  // 로딩 완료
  //     } catch (error) {
  //      console.error('Error fetching bidding records:', error);
  //      setLoading(false);  // 로딩 실패
  //     }
  //   };
 
  //   fetchBiddingRecords();
  // }, []);  // 빈 배열을 넣어 컴포넌트가 처음 렌더링될 때 한 번만 실행


  // 희망 입찰가 상태 관리
  const [bidAmount, setBidAmount] = useState(63000);  // 초기값 설정
  // 입찰가 증가 함수
  const increaseBid = () => {
    setBidAmount((prevBid) => prevBid + 1000);  // +1000
  };
  // 입찰가 감소 함수
  const decreaseBid = () => {
    setBidAmount((prevBid) => Math.max(prevBid - 1000, 0));  // -1000, 최소값은 0
  };


  // 입찰하기 모달창
  const [biddingNowModalOpen, setBiddingNowModalOpen] = useState(false);
  const openBiddingNowModal = () => {
    setBiddingNowModalOpen(true);
  };
  const closeBiddingNowModal = () => {
    setBiddingNowModalOpen(false);
  };
  // 입찰하기 모달의 아이템 현재 정보
  const nowBiddingInfo = {
    name: "Classibot (iBoy)",
    category: "일반경매 입찰",
    bidPrice: bidAmount,
    purchaseFee: (bidAmount / 10), // 구매 수수료 는 구매가의 10퍼센트
  };
  const totalPrice = nowBiddingInfo.bidPrice + nowBiddingInfo.purchaseFee;

  // 입찰하기 데이터 전송 함수
  const handleBidNow = () => {
    const biddingData = {
      itemName: nowBiddingInfo.name,
      category: nowBiddingInfo.category,
      bidPrice: nowBiddingInfo.bidPrice,
      totalPrice: totalPrice,
    };
    
    console.log('카테고리: ' + biddingData.category);
    console.log('즉시구매아이템: ' + biddingData.itemName);
    console.log('즉시구매가: ' + biddingData.bidPrice);
    console.log('즉시구매 결재금액: ' + biddingData.totalPrice);

    // 백엔드로 데이터 전송
    fetch('/api/bid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(biddingData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        alert('입찰이 성공적으로 전송되었습니다.');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  // 즉시구매가 설정
  const [buyNowPrice, setBuyNowPrice] = useState(110000);
  // 즉시구매 모달창
  const [buyingNowModalOpen, setBuyingNowModalOpen] = useState(false);
  const openBuyingNowModal = () => {
    setBuyingNowModalOpen(true);
  };
  const closeBuyingNowModal = () => {
    setBuyingNowModalOpen(false);
  };
  // 즉시구매 모달의 아이템 현재 정보
  const nowBuyingInfo = {
    name: "Classibot (iBoy)",
    category: "즉시 구매",
    buyNowPrice: buyNowPrice,
    buyNowpurchaseFee: (buyNowPrice / 10),
  };
  const paymentAccount = nowBuyingInfo.buyNowPrice + nowBuyingInfo.buyNowpurchaseFee;

  // 즉시 구매 데이터 전송 함수
  const handleBuyNow = () => {
    const buyingData = {
      itemName: nowBuyingInfo.name,
      category: nowBuyingInfo.category,
      buyNowPrice: nowBuyingInfo.buyNowPrice,
      paymentAccount: paymentAccount,
    };

    console.log('카테고리: ' + buyingData.category);
    console.log('즉시구매아이템: ' + buyingData.itemName);
    console.log('즉시구매가: ' + buyingData.buyNowPrice);
    console.log('즉시구매 결재금액: ' + buyingData.paymentAccount);

    // 백엔드로 데이터 전송
    fetch('/api/buy-now', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buyingData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        alert('즉시 구매가 성공적으로 전송되었습니다.');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="CID-item-block">
      <div className="CID-bid-item-container">
        {/* 이미지 섹션 */}
        <div className="CID-image-section">
          <img src={img1} alt="Main Image" className="CID-main-image" />
          <div className="CID-thumbnail-container">
            <img src={img2} alt="Thumbnail 1" className="CID-thumbnail" />
            <img src={img3} alt="Thumbnail 2" className="CID-thumbnail" />
            <img src={img4} alt="Thumbnail 3" className="CID-thumbnail" />
            <img src={img5} alt="Thumbnail 4" className="CID-thumbnail" />
          </div>

          {/* 판매자 섹션 */}
          <div className="CID-merchant-section">
            <div className="CID-merchant-info">
              <p>판매자: (seller.name)</p>
              <p>판매자의 진행중인 경매: (DB에서 조회)건</p>
            </div>
            <div className="CID-merchant-link">
              <button className='CID-seller-more-info-hvr' onClick={openSellerModal}>seller.name + 의 정보 더보기</button>
              {/* 첫 번째 모달 - open-seller-modal : 판매자 정보 더 보기 */}
              <Modal
                isOpen={sellerModalOpen}
                onRequestClose={closeSellerModal}
                className="CID-seller-modal-content"
                overlayClassName="CID-seller-modal-overlay"
              >
                {/* 모달 상단 부분 */}
                <div className="CID-seller-modal-header">
                  {/* <img src="../img/tmp-profile-icon.png" alt="판매자 아이콘" className="CID-seller-modal-icon" /> */}
                  <h2>판매자 정보 더보기</h2>
                  {/* <button className="CID-seller-modal-close" onClick={closeModal}>X</button> */}
                </div>
                <table className="CID-seller-modal-table">
                  <tbody>
                    <tr>
                      <th>판매자 아이디</th>
                      <td>Crown_Bid</td>
                    </tr>
                    <tr>
                      <th>전화번호</th>
                      <td>010-9578-2453</td>
                    </tr>
                    <tr>
                      <th>E-mail</th>
                      <td>bit@bitcamp.com</td>
                    </tr>
                    <tr>
                      <th>상호명</th>
                      <td>크라운비드</td>
                    </tr>
                    <tr>
                      <th>사업자 구분</th>
                      <td>일반사업자</td>
                    </tr>
                    <tr>
                      <th>통판매업 신고</th>
                      <td>2022-경기군포-0226</td>
                    </tr>
                    <tr>
                      <th>사업자등록번호</th>
                      <td>875-12-10239</td>
                    </tr>
                    <tr>
                      <th>대표자</th>
                      <td>홍길동</td>
                    </tr>
                    <tr>
                      <th>영업 소재지</th>
                      <td>경기도 안양시 만안구 시민대로 35번길 41(안양동)</td>
                    </tr>
                  </tbody>
                </table>

                {/* 확인 버튼 */}
                <button className="CID-seller-modal-confirm-button" onClick={closeSellerModal}>확인</button>
              </Modal>
            </div>
          </div>
        </div>

        {/* 입찰 섹션 */}
        <div className="CID-bid-section">
          <div className="CID-bid-title">(DB에서 사용자가 입력한 아이템이름 조회)</div>
          <div className="CID-price">현재가: (DB에서 조회) 원</div>

          <div className="CID-bid-details">
            <p>남은시간: 0일 0시간 0분 0초 (DB에서 조회)</p>
            <p>경매번호: (DB에서 조회)</p>
            <p>
              입찰기록: (DB에서 조회)회
              <div>
                <span className="CID-hover-link" onClick={openBiddingRecordModal}>[기록보기]</span>
                {/* 두 번째 모달 - bidding-record-modal : 입찰 기록 보기 */}
                <Modal
                  isOpen={biddingRecordModalOpen}
                  onRequestClose={closeBiddingRecordModal}
                  className="CID-bidding-record-modal-content"
                  overlayClassName="CID-bidding-record-modal-overlay"
                >
                  <h2>입찰기록내역</h2>
                  <table className="CID-bidding-record-table">
                    <thead>
                      <tr>
                        <th>입찰일시</th>
                        <th>입찰자</th>
                        <th>입찰금액</th>
                      </tr>
                    </thead>
                    <tbody>
                      {biddingRecords.map((record, index) => (
                        <tr key={index}>
                          <td>{record.date}</td>
                          <td>{record.bidder}</td>
                          <td>{record.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="CID-bidding-record-pagination">
                    <span>1</span>
                  </div>
                  <button className="CID-bidding-record-confirm-button" onClick={closeBiddingRecordModal}>확인</button>
                </Modal>
              </div>
            </p>
            <p>입찰단위: (DB에서 조회)원</p>
          </div>

          <div className="CID-bid-controls">
            <label htmlFor="bid-amount" style={{ marginRight: '10px' }}>
              희망 입찰가:
            </label>
            <div className="CID-bid-input-wrapper">

              <div className="CID-bid-input">
                <input 
                  type="text"
                  id="bid-amount"
                  value={bidAmount}
                  readOnly/>
              </div>
              원
              <div className="CID-bid-buttons-vertical">
                <IconButton className="CID-bid-button" onClick={increaseBid}>
                  <AddBoxIcon/>
                </IconButton>
                <IconButton className="CID-bid-button" onClick={decreaseBid}>
                  <IndeterminateCheckBoxIcon/>
                </IconButton>
              </div>

            </div>
          </div>

          <div className="CID-expected-price">예상 구매가: {totalPrice.toLocaleString()} 원</div>
          <p>(입찰 희망가 {nowBiddingInfo.bidPrice.toLocaleString()} 원 + 구매수수료 {(nowBiddingInfo.purchaseFee).toLocaleString()} 원)</p>
          <div className="CID-divider"></div>

          {/* 버튼 */}
          <div className="CID-bid-buttons">
            {/* 세 번째 모달 bidding-now-modal */}
            <button className="CID-bid-button" onClick={openBiddingNowModal}>입찰하기</button>
            <Modal
              isOpen={biddingNowModalOpen}
              onRequestClose={closeBiddingNowModal}
              className="CID-bidding-now-modal-content"
              overlayClassName="CID-bidding-now-modal-overlay"
            >
              <h2 className="CID-bidding-now-modal-title">경매 진행 중</h2>
              <div className="CID-bidding-now-modal-body">
                <div className="CID-bidding-now-modal-image">
                  <img src={img1} alt={nowBiddingInfo.name} />
                </div>
                <div className="CID-bidding-now-modal-details">
                  <h3>{nowBiddingInfo.name} 경매</h3>
                  <p><strong className='bidding-now-modal-details-p'>경매 분류</strong>{nowBiddingInfo.category}</p>
                  <p><strong className='bidding-now-modal-details-p'>입찰 희망가</strong> <span className="CID-highlight-red">{nowBiddingInfo.bidPrice.toLocaleString()} 원</span></p>
                  <p><strong className='bidding-now-modal-details-p'>구매 예상가</strong> {totalPrice.toLocaleString()} 원</p>
                  <p className='bidding-now-modal-price-info'>(입찰 희망가 {nowBiddingInfo.bidPrice.toLocaleString()} 원 + 구매수수료 {nowBiddingInfo.purchaseFee.toLocaleString()} 원)</p>
                </div>
              </div>
              <button className="CID-bidding-now-modal-bid-button" onClick={handleBidNow}>입찰하기</button>
            </Modal>

            {/* 네 번째 모달 buying-now-modal */}
            <button className="CID-bid-button buy-button" onClick={openBuyingNowModal}>
              (DB에서 사용자가 올린 즉시구매금액 조회) 원으로 즉시 구매
            </button>
            <Modal
              isOpen={buyingNowModalOpen}
              onRequestClose={closeBuyingNowModal}
              className="CID-bidding-now-modal-content"
              overlayClassName="CID-bidding-now-modal-overlay"
            >
              <h2 className="CID-bidding-now-modal-title">구매 진행 중</h2>
                <div className="CID-bidding-now-modal-body">
                  <div className="CID-bidding-now-modal-image">
                    <img src={img1} alt={nowBuyingInfo.name} />
                  </div>
                  <div className="CID-bidding-now-modal-details">
                    <h3>{nowBuyingInfo.name} 경매</h3>
                    <p><strong className='bidding-now-modal-details-p'>경매 분류</strong>{nowBuyingInfo.category}</p>
                    <p><strong className='bidding-now-modal-details-p'>즉시 구매가</strong>{nowBuyingInfo.buyNowPrice.toLocaleString()} 원</p>
                    <p><strong className='bidding-now-modal-details-p'>총 결재금액</strong><span className="CID-highlight-red">{paymentAccount.toLocaleString()}</span> 원</p>
                    <p className='biddng-now-modal-price-info'>(즉시 구매가 {nowBuyingInfo.buyNowPrice.toLocaleString()} 원 + 구매 수수료 {nowBuyingInfo.buyNowpurchaseFee.toLocaleString()} 원)</p>
                </div>
                </div>
              <button className="CID-bidding-now-modal-bid-button" onClick={handleBuyNow}>즉시 구매</button>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatItDetMain;
