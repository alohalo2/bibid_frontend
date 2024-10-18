import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // 서버 주소로 변경 필요

export default socket;