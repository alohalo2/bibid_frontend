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

// 서버가 사용자로부터 연결을 받았을 때
io.on('connection', (socket) => {
  console.log('사용자가 연결되었습니다:', socket.id);

  // 클라이언트로부터 메시지 수신
  socket.on('sendMessage', (messageData) => {
    // 모든 클라이언트에게 메시지 전달
    io.emit('receiveMessage', messageData);
  });

  // 연결 해제 시
  socket.on('disconnect', () => {
    console.log('사용자가 연결 해제되었습니다:', socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});

app.get('/api/user-type', (req, res) => {
    const userTypeData = { userType: 'seller' }; // 실제 데이터로 변경
    res.json(userTypeData);
});