// server.js
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io'); // 최신 버전의 socket.io 사용 시

const app = express();
const server = createServer(app);

// `io`를 생성할 때 `CORS` 설정 추가
const io = new Server(server, {
    cors: {
      origin: "*", // 모든 도메인 허용 (보안을 위해 특정 도메인으로 변경하는 것이 좋습니다)
      methods: ["GET", "POST"] // 허용할 HTTP 메서드
    }
  });

// 각 경매에 대한 참여자 수를 저장할 객체
const participants = {};

// 서버가 사용자로부터 연결을 받았을 때
io.on('connection', (socket) => {

  // 클라이언트로부터 메시지 수신
  socket.on('sendMessage', (messageData) => {
    // 모든 클라이언트에게 메시지 전달
    io.emit('receiveMessage', messageData);
  });

  // 사용자가 특정 경매에 참여할 때
  socket.on('joinAuction', (auctionIndex) => {
    // 경매에 대한 참여자 수가 아직 없는 경우 초기화
    if (!participants[auctionIndex]) {
      participants[auctionIndex] = new Set();
    }

    // 사용자 ID를 경매에 추가
    participants[auctionIndex].add(socket.id);
    socket.join(auctionIndex);

    // 해당 경매 방의 모든 클라이언트에게 현재 참여자 수를 브로드캐스트
    io.to(auctionIndex).emit('participantCount', { count: participants[auctionIndex].size });

  });
  
  // 사용자가 특정 경매에서 떠날 때
  socket.on('leaveAuction', (auctionIndex) => {
    if (participants[auctionIndex]) {
      participants[auctionIndex].delete(socket.id);
      socket.leave(auctionIndex);

      // 참여자가 남아있는 경우만 브로드캐스트
      if (participants[auctionIndex].size > 0) {
        io.to(auctionIndex).emit('participantCount', { count: participants[auctionIndex].size });
      } else {
        delete participants[auctionIndex]; // 더 이상 참여자가 없으면 경매 삭제
      }

    }
  });
  
  // 연결 해제될 때
  socket.on('disconnect', () => {
    // 모든 경매에 대해 해당 사용자를 제거
    for (const auctionIndex in participants) {
      if (participants[auctionIndex].has(socket.id)) {
        participants[auctionIndex].delete(socket.id);

        // 해당 경매 방의 모든 클라이언트에게 현재 참여자 수를 브로드캐스트
        if (participants[auctionIndex].size > 0) {
          io.to(auctionIndex).emit('participantCount', { count: participants[auctionIndex].size });
        } else {
          delete participants[auctionIndex];
        }

      }
    }
  });

});

const PORT = 3000;
server.listen(PORT, () => {
});

app.get('/api/user-type', (req, res) => {
    const userTypeData = { userType: 'seller' }; // 실제 데이터로 변경
    res.json(userTypeData);
});