import React, {useEffect, useState} from 'react';
import '../../css/SpecialAuction/SAsellerStreamingBox.css';

const SAsellerSteamingBox = ({channelInfo}) => {

    const [isKeyVisible, setIsKeyVisible] = useState(false);

    // Server URL 
    const serverURL = channelInfo.serverURL;

     // Stream key
    const streamKey = channelInfo.streamKey;

    // 눈모양 클릭하면 Stream key 보이게 or 안보이게
    const toggleKeyVisibility = () => {
        setIsKeyVisible(!isKeyVisible);
    };

    // 복사 버튼 누르면 클립보드에 복사
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                alert('스트림 키가 복사되었습니다!');
            })
            .catch((err) => {
                console.error('복사 실패:', err);
            });
    };

    return (
        <div className='SAsellerSteamingBox'>
            <h2>스트림 설정</h2>
            <p>경매가 생성되기 전, 스트림 서버와 스트림 키로 아래 단계 대로 OBS 인코더를 설정하세요.</p>
            <div className='SAstreamingStatus'>
                <div className='SAstreamingStatusHeader'>
                    <h3>스트림 준비 상태</h3>
                </div>
                <div className='SAstreamingStatusContents'>
                    <div>
                        <p>스트림 키 & 서버 : {channelInfo.channelStatus}</p>
                    </div>
                    <div className='SAstreamingStatusContentsContour'></div>
                    <div>
                        <p>스트림 송출 : {channelInfo.cdnStatusName}</p>
                    </div>
                </div>
            </div>
            <ol className='SAstreamingGuideList'>
                <li>
                    <h4><strong>OBS studio에서 설치 프로그램 다운로드</strong></h4>
                    <ul>
                        <li className='SAobsDownload'>
                            <p id='SAobsDownload_title'>OBS studio</p><a href='https://obsproject.com/download'>
                            <div className='SAobsDownloadURL'>
                                설치
                            </div>
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <h4><strong>인코더에 카메라 연결</strong></h4>
                    <ul>
                        <li>
                            <p>설치된 OBS studio를 실행</p>
                        </li>
                        <li>
                            <p>OBS 프로그램 내 <strong>Source(소스 목록)</strong> 입력 하단에 <strong>+버튼</strong>을 클릭</p>
                        </li>
                        <li>
                            <p><strong>Create New</strong>로 새로 생성을 통해 카메라 이름 지정</p>
                        </li>
                        <li>
                            <p><strong>Device 드롭다운 목록</strong>에서 컴퓨터에 <strong>내장 카메라 선택</strong></p>
                        </li>
                    </ul>
                </li>
                <li>
                    <h4><strong>방송 설정</strong></h4>
                    <ul>
                        <li>
                            <p>상단 메뉴에서 <strong>파일 {'>'} 설정 {'>'} 방송</strong> 순서로 클릭</p>
                        </li>
                        <li>
                            <p><strong>서버</strong>와 <strong>스트림 키</strong>를 복사하여 방송 설정에 붙여넣기</p>
                        </li>
                        <li>
                            <div>
                                <p id='SAstreamingServerURL_title'><strong>서버 URL : </strong> 방송 설정 서버의 스트림 URL</p>
                                <div className='SAstreamingServerURLBox'>
                                    <div className='SAstreamingServerURL'>
                                        <p id='SAstreamingServerURLId'>{serverURL}</p>
                                    </div>
                                    <button onClick={() => copyToClipboard(serverURL)}>
                                        <p>복사</p>
                                    </button>
                                </div>
                            </div>
                        </li>
                        <li>
                        <div>
                            <p id='SAstreamingKey_title'><strong>스트림 키 : </strong> 방송 송출할 채널의 스트림 키</p>
                            <div className='SAstreamingKeyBox'>
                                <div className='SAstreamingKey'>
                                    <p id='SAstreamingKeyId'>
                                        {isKeyVisible ? streamKey : '************'}
                                    </p>
                                    <div className='SAstreamingKeyEyeIcon' onClick={toggleKeyVisibility}>
                                        <img
                                            src={isKeyVisible ? '/images/open_eye_icon.svg' : '/images/close_eye_icon.svg'}
                                            alt='Toggle visibility'
                                        />
                                    </div>
                                </div>
                                <button onClick={() => copyToClipboard(streamKey)}>
                                    <p>복사</p>
                                </button>
                            </div>
                        </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <h4 id='SAbroadcastStart'><strong>방송 시작</strong></h4>
                    <ul>
                        <p>경매 시작 시간에 맞춰 <strong>수동</strong>으로 방송시작</p>
                        <p>OBS 프로그램 내 <strong>방송 시작</strong> 버튼 클릭</p>
                        <p>OBS 프로그램 내 <strong>녹화 시작</strong> 버튼 클릭</p>
                    </ul>
                </li>
            </ol>
        </div>
    );
};

export default SAsellerSteamingBox;