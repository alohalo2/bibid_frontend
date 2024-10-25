import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useSelector } from 'react-redux';
import Cookies from "js-cookie";

const useWebSocket = (auctionIndex, isChatClosed) => {

  const loginMemberNickname = useSelector((state) => state.memberSlice.nickname);

  const [messages, setMessages] = useState({});
  const [inputMessage, setInputMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [currentPrices, setCurrentPrices] = useState({});
  const [bidAmounts, setBidAmounts] = useState({});
  const [bidderNicknames, setBidderNicknames] = useState({});
  const [participantCount, setParticipantCount] = useState({}); // 참여자 수 상태 추가
  const [auctionStatuses, setAuctionStatuses] = useState({});

  // 컬러 배열 정의
  const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF0',
    '#FFD700', '#DC143C', '#8A2BE2', '#FF8C00', '#00CED1', '#00FA9A',
    '#FF69B4', '#BA55D3', '#8B4513', '#4682B4', '#6A5ACD', '#708090',
    '#FF6347', '#DA70D6', '#20B2AA', '#B22222', '#FF4500', '#2E8B57',
    '#ADFF2F', '#F08080', '#CD5C5C', '#6495ED', '#DB7093', '#AFEEEE'
  ];

  // 해시 함수로 닉네임을 해싱하여 색상 선택
  const getNicknameColor = (nickname) => {
    if (nickname === '시스템') {
      return '#0000FF'; // 파란색
    }

    // 닉네임의 해시 값을 계산
    let hash = 0;
    for (let i = 0; i < nickname.length; i++) {
      hash = nickname.charCodeAt(i) + ((hash << 5) - hash);
    }

    // 해시 값을 색상 배열의 길이로 나눈 나머지로 색상을 선택
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  // WebSocket 연결 함수
  useEffect(() => {

    if (!auctionIndex || isChatClosed) return;

    const connectWebSocket = () => {
      const token = Cookies.get('ACCESS_TOKEN');

      const socket = new SockJS('http://localhost:8080/ws');

      const client = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },

        onConnect: () => {
          setConnected(true);
          console.log("웹소켓 연결되었습니다.");
          setMessages((prev) => ({ ...prev, [auctionIndex]: [] }));

          // 채팅 구독
          client.subscribe(`/topic/public/${auctionIndex}`, (message) => {
            const newMessage = JSON.parse(message.body);
            console.log("Message received:", newMessage);
            setMessages((prevMessages) => ({
              ...prevMessages,
              [auctionIndex]: [
                ...(prevMessages[auctionIndex] || []), 
                {
                  chatMessage: newMessage.chatMessage,
                  senderNickname: newMessage.senderNickname || '시스템',
                  sendTime: newMessage.sendTime,
                  color: getNicknameColor(newMessage.senderNickname), // 닉네임에 따른 색상
                },
              ],
            }));
          });

          // 경매 구독
          client.subscribe(`/topic/auction/${auctionIndex}`, (message) => {
              const auctionInfo = JSON.parse(message.body);
              console.log("Bid received:", auctionInfo);
      
              // 입찰 정보를 처리
              if (auctionInfo.bidAmount) {
                setCurrentPrices((prev) => ({
                  ...prev,
                  [auctionIndex]: auctionInfo.bidAmount,
                }));
                setBidAmounts((prev) => ({
                  ...prev,
                  [auctionIndex]: auctionInfo.bidAmount,
                }));
                setBidderNicknames((prev) => ({
                  ...prev,
                  [auctionIndex]: auctionInfo.bidderNickname,
                }))
              }
          });

          // 참여자 입장 구독
          client.subscribe(`/topic/participants/enter/${auctionIndex}`, (message) => {
            const participantEnterInfo = JSON.parse(message.body);
            console.log("Participant count(enter):", participantEnterInfo);
          
            // 새로운 메시지를 상태에 추가
            setMessages((prevMessages) => ({
              ...prevMessages,
              [auctionIndex]: [
                ...(prevMessages[auctionIndex] || []),
                {
                  chatMessage: participantEnterInfo.chatMessage,
                  senderNickname: participantEnterInfo.senderNickname || '시스템',
                  sendTime: participantEnterInfo.sendTime,
                }
              ]
          }));

            // 참여자 배열 업데이트
            setParticipantCount((prev) => ({
              ...prev,
              [auctionIndex]: participantEnterInfo.participantCount,
            }));
          });

          // 참여자 퇴장 구독
          client.subscribe(`/topic/participants/leave/${auctionIndex}`, (message) => {
            const participantLeaveInfo = JSON.parse(message.body);
            console.log("Participant count(leave):", participantLeaveInfo);
          
            // 새로운 메시지를 상태에 추가
            setMessages((prevMessages) => ({
              ...prevMessages,
              [auctionIndex]: [
                ...(prevMessages[auctionIndex] || []),
                {
                  chatMessage: participantLeaveInfo.chatMessage,
                  senderNickname: participantLeaveInfo.senderNickname || '시스템',
                  sendTime: participantLeaveInfo.sendTime,
                }
              ]
          }));

            // 참여자 배열 업데이트
            setParticipantCount((prev) => ({
              ...prev,
              [auctionIndex]: participantLeaveInfo.participantCount,
            }));
          });
          
          // 방에 입장할 때 메시지 초기화
          // 입장 메시지 전송
          sendJoinMessage(client, auctionIndex);
        },
        onStompError: (error) => {
          console.error("WebSocket error:", error);
        },
      });

      // // 경매 종료 구독
      // client.subscribe(`/topic/auction/end/${auctionIndex}`, (message) => {
      //   const auctionEndInfo = JSON.parse(message.body);
      //   console.log("Auction end received:", auctionEndInfo);

      //   // auctionIndex에 따라 경매 종료 상태를 업데이트
      //   setAuctionStatuses((prev) => ({
      //     ...prev,
      //     [auctionIndex]: "ended", // 해당 경매의 상태를 "ended"로 설정
      //   }));
      // });

      // // 경매 일시 중지 구독
      // client.subscribe(`/topic/auction/suspended/${auctionIndex}`, (message) => {
      //   const auctionSuspendedInfo = JSON.parse(message.body);
      //   console.log("Auction suspended received:", auctionSuspendedInfo);

      //   // auctionIndex에 따라 경매 중단 상태를 업데이트
      //   setAuctionStatuses((prev) => ({
      //     ...prev,
      //     [auctionIndex]: "suspended", // 해당 경매의 상태를 "suspended"로 설정
      //   }));
      // });

      client.activate();
      setStompClient(client);
    };

    connectWebSocket();

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [auctionIndex, isChatClosed]);

  // WebSocket 연결 해제 함수
  const disconnectWebSocket = () => {
    if (stompClient) {
      sendLeaveMessage(); // 퇴장 메시지 전송
      stompClient.deactivate();
      setConnected(false);
      console.log("웹소켓 연결이 해제되었습니다.");
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
        }),
      });
      setInputMessage(''); // 입력 초기화
    }
  };

  // 입장 메시지 전송
  const sendJoinMessage = (client, auctionIndex) => {
    const joinMessage = `${loginMemberNickname}님이 입장하셨습니다.`;
    client.publish({
      destination: `/app/chat.enter/${auctionIndex}`,
      body: JSON.stringify({
        senderNickname: '시스템',
        chatMessage: joinMessage,
      }),
    });

    // const welcomeMessage = '채팅방에 입장하셨습니다. 환영합니다.';
    // setMessages((prevMessages) => [
    //   ...prevMessages,
    //   { chatMessage: welcomeMessage, senderNickname: '시스템' },
    // ]);
  };

  // 퇴장 메시지 전송
  const sendLeaveMessage = () => {
    if (connected && stompClient) {
      const leaveMessage = `${loginMemberNickname}님이 퇴장하셨습니다.`;
      stompClient.publish({
        destination: `/app/chat.leave/${auctionIndex}`,
        body: JSON.stringify({
          senderNickname: '시스템',
          chatMessage: leaveMessage,
        }),
      });
    }
  };

  // 입찰 버튼 클릭 시 처리 함수
  const handleBidSubmit = (auctionIndex, bidAmount) => {
    if (bidAmount > currentPrices[auctionIndex]) {
      setBidAmounts((prev) => ({
        ...prev,
        [auctionIndex]: bidAmount,
      }));
      stompClient.publish({
        destination: `/app/auction.bid/${auctionIndex}`,
        body: JSON.stringify({ auctionIndex, bidAmount }),
      });
    } else {
      alert('입찰가는 현재가보다 높아야 합니다.');
      console.log(bidAmount + " : 입찰가");
      console.log(currentPrices[auctionIndex] + " : 현재가");
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
    setCurrentPrices,
    bidAmounts,
    setBidAmounts,
    participantCount, // 추가된 참여자 수 상태 반환
    disconnectWebSocket, // 연결 해제 함수 반환
    bidderNicknames,
    // auctionStatuses
  };
};

export default useWebSocket;
