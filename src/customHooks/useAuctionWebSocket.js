import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ChatMessageType = {
  ENTER: "ENTER",
  LEAVE: "LEAVE",
  MESSAGE: "MESSAGE",
};

const useAuctionWebSocket = (auctionIndex, isChatClosed) => {
  const loginMemberNickname = useSelector((state) => state.memberSlice.nickname);

  // 상태 초기화
  const [messages, setMessages] = useState({});
  const [inputMessage, setInputMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [currentPrices, setCurrentPrices] = useState({});
  const [bidAmounts, setBidAmounts] = useState({});
  const [bidderNicknames, setBidderNicknames] = useState({});
  const [participantCount, setParticipantCount] = useState({});
  const [auctionDetails, setAuctionDetails] = useState({});

  const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF0',
    '#FFD700', '#DC143C', '#8A2BE2', '#FF8C00', '#00CED1', '#00FA9A',
    '#FF69B4', '#BA55D3', '#8B4513', '#4682B4', '#6A5ACD', '#708090',
    '#FF6347', '#DA70D6', '#20B2AA', '#B22222', '#FF4500', '#2E8B57',
    '#ADFF2F', '#F08080', '#CD5C5C', '#6495ED', '#DB7093', '#AFEEEE'
  ];

  // 닉네임 색상 선택 함수
  const getNicknameColor = (nickname) => {
    if (nickname === '시스템') return '#0A369D';
    let hash = 0;
    for (let i = 0; i < nickname.length; i++) {
      hash = nickname.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  // 1분 내 메시지 불러오기
  const loadLastMinuteMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/chat/lastMinute/${auctionIndex}`, { withCredentials: true });
      console.log("최근 1분 메시지 불러오기:", response.data);
      setMessages((prevMessages) => ({
        ...prevMessages,
        [auctionIndex]: response.data.map(msg => ({
          chatMessage: msg.chatMessage,
          senderNickname: msg.senderNickname,
          sendTime: msg.sendTime,
          color: getNicknameColor(msg.senderNickname),
        })),
      }));
    } catch (error) {
      console.error("최근 1분 채팅 불러오기 실패:", error);
    }
  };

  // WebSocket 연결 및 초기 메시지 설정
  useEffect(() => {
    if (!auctionIndex || isChatClosed) return;

    const connectAuctionWebSocket = async () => {
      await loadLastMinuteMessages();

      const auctionSocket = new SockJS('http://localhost:8080/ws-auctions', null, { withCredentials: true });
      const auctionClient = new Client({
        webSocketFactory: () => auctionSocket,
        onConnect: () => {
          setConnected(true);
          console.log("웹소켓 연결되었습니다.");

          // 채팅 구독
          auctionClient.subscribe(`/topic/public/${auctionIndex}`, (message) => {
            const newMessage = JSON.parse(message.body);
            updateMessages(newMessage);
          });

          // 경매 구독
          auctionClient.subscribe(`/topic/auction/${auctionIndex}`, (message) => {
            const auctionInfo = JSON.parse(message.body);
            handleAuctionUpdates(auctionInfo);
          });

          // 참가자 수 구독
          auctionClient.subscribe(`/topic/participants/count/${auctionIndex}`, (message) => {
            const count = JSON.parse(message.body);
            setParticipantCount((prevCounts) => ({
              ...prevCounts,
              [auctionIndex]: count
            }));    
          });

          sendJoinMessage(auctionClient, auctionIndex);
        },
        onStompError: (error) => console.error("WebSocket error:", error),
      });

      auctionClient.activate();
      setStompClient(auctionClient);
    };

    connectAuctionWebSocket();

    return () => stompClient && stompClient.deactivate();
  }, [auctionIndex, isChatClosed]);

  // 메시지 업데이트
  const updateMessages = (newMessage) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      [auctionIndex]: [
        ...(prevMessages[auctionIndex] || []),
        {
          chatMessage: newMessage.chatMessage,
          senderNickname: newMessage.senderNickname || '시스템',
          sendTime: newMessage.sendTime,
          color: getNicknameColor(newMessage.senderNickname),
        },
      ],
    }));
  };

  // 경매 정보 업데이트
  const handleAuctionUpdates = (auctionInfo) => {
    if (auctionInfo.bidAmount) {
      setCurrentPrices((prev) => ({ ...prev, [auctionIndex]: auctionInfo.bidAmount }));
      setBidAmounts((prev) => ({ ...prev, [auctionIndex]: auctionInfo.bidAmount }));
      setBidderNicknames((prev) => ({ ...prev, [auctionIndex]: auctionInfo.bidderNickname }));
    }
    if (auctionInfo.winnerIndex) {
      setAuctionDetails((prev) => ({
        ...prev,
        [auctionIndex]: {
          winnerIndex: auctionInfo.winnerIndex,
          winningBid: auctionInfo.winningBid,
        },
      }));
    }
  };

  // 메시지 전송 함수
  const sendMessage = () => {
    if (connected && stompClient) {
      stompClient.publish({
        destination: `/app/chat.sendMessage/${auctionIndex}`,
        body: JSON.stringify({
          senderNickname: loginMemberNickname,
          chatMessage: inputMessage,
          messageType: ChatMessageType.MESSAGE,
        }),
      });
      setInputMessage('');
    }
  };

  // 입장 메시지 전송
  const sendJoinMessage = (client, auctionIndex) => {
    client.publish({
      destination: `/app/chat.enter/${auctionIndex}`,
      body: JSON.stringify({
        senderNickname: '시스템',
        chatMessage: `${loginMemberNickname}님이 입장하셨습니다.`,
        messageType: ChatMessageType.ENTER,
      }),
    });
  };

  // 퇴장 메시지 전송
  const sendLeaveMessage = () => {
    if (connected && stompClient) {
      stompClient.publish({
        destination: `/app/chat.leave/${auctionIndex}`,
        body: JSON.stringify({
          senderNickname: '시스템',
          chatMessage: `${loginMemberNickname}님이 퇴장하셨습니다.`,
          messageType: ChatMessageType.LEAVE,
        }),
      });
    }
  };

  // 입찰 처리 함수
  const handleBidSubmit = (bidAmount) => {
    if (bidAmount > currentPrices[auctionIndex]) {
      setBidAmounts((prev) => ({ ...prev, [auctionIndex]: bidAmount }));
      stompClient.publish({
        destination: `/app/auction.bid/${auctionIndex}`,
        body: JSON.stringify({ auctionIndex, bidAmount }),
      });
    } else {
      alert('입찰가는 현재가보다 높아야 합니다.');
    }
  };

  return {
    messages,
    inputMessage,
    setInputMessage,
    sendMessage,
    sendLeaveMessage,
    handleBidSubmit,
    currentPrices,
    bidAmounts,
    participantCount,
    disconnectWebSocket: () => stompClient && stompClient.deactivate(),
    bidderNicknames,
    auctionDetails,
    setCurrentPrices,
    setBidAmounts
  };
};

export default useAuctionWebSocket;
