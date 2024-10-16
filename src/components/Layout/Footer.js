import React from 'react';
import '../../css/Layout/Footer.css';
import '../../css/Layout/MediaQuery.css';
import logoWhite from '../../images/logo_white.svg';
import instagramIcon from '../../images/instagram_icon.svg';
import facebookIcon from '../../images/facebook_icon.svg';
import twitterIcon from '../../images/tiwtter_icon.svg';
import pinterestIcon from '../../images/pinterest_icon.svg';

const Footer = () => {
  return (
    <footer>
        <div className="FTcontents">
            <div className="FTcontentsBody">
                <div className="FTcontentsBody_logo">
                    <img id="FTlogo" src={logoWhite} alt="FTlogo"></img>
                </div>
                <div className="FTcontentsBodyContent">
                    <div className="FTcontentsBodyContentMenu">
                        <p>회사소개</p>
                        <div className="FTcontour"></div>
                        <p>이용약관</p>
                        <div className="FTcontour"></div>
                        <p>개인정보취급방침</p>
                        <div className="FTcontour"></div>
                        <p>이메일무단수집거부</p>
                        <div className="FTcontour"></div>
                        <p>고객센터</p>
                    </div>
                    <div className="FTcontentsBodyContentDetail">
                        <p>상호명: 원티드</p>
                        <div className="FTcontour"></div>
                        <p>주소: 서울특별시 강남구 819 3 삼오빌딩 5-8층</p>
                        <p>Tel: 010-1234-5678</p>
                        <div className="FTcontour"></div>
                        <p>E-mail: bitcamp502@bitcamp.com</p>
                    </div>
                    <div className="FTcontentsBodyContentMember">
                        <p>Lee Jusung</p>
                        <div className="FTcontour"></div>
                    </div>
                </div>
            </div>
            <div className="FTcontentsBttm">
                <p>© {new Date().getFullYear()} WANTED All picture cannot be copied without permission.</p>
            </div>
        </div>
        <div className="FTmainContour"></div>
        <div className="FTicons">
            <a href="#"><img src={instagramIcon} alt="instagram"></img></a> 
            <a href="#"><img id="FTfacebookIcon" src={facebookIcon} alt="facebook"></img></a>
            <a href="#"><img src={twitterIcon} alt="twitter"></img></a>
            <a href="#"><img src={pinterestIcon} alt="pinterest"></img></a>
        </div>
    </footer>
  );
};

export default Footer;