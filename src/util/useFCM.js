import { useEffect } from 'react';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAEBkk7q-oCVheyLqlFPY9nn16t01bvQTM",
  authDomain: "bitcamp-bibid.firebaseapp.com",
  projectId: "bitcamp-bibid",
  storageBucket: "bitcamp-bibid.appspot.com",
  messagingSenderId: "901974583670",
  appId: "1:901974583670:web:703549da9ae2189374f257"
};

const app = initializeApp(firebaseConfig);

const useFCM = () => {
  useEffect(() => {
    const messaging = getMessaging(app);

    getToken(messaging, { vapidKey: 'BEf_MikZXgP_iPv4KalJC2ED6HB70_ybhMQ3PyLqCh6SwHy76fNzsb1ucQZSmlHD0xA6foYKoIhdTTnj-IbEu7k' }).then((currentToken) => {

    }).catch((err) => {
      console.log('FCM 토큰 가져오기 중 오류 발생:', err);
    });
  }, []);
};

export default useFCM;
