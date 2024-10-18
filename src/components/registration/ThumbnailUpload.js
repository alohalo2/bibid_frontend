import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const ThumbnailUpload = ({ formData, setFormData }) => {
    const [thumbnailPreview, setThumbnailPreview] = useState('');

    // 썸네일 미리보기 설정
    useEffect(() => {
        if (!formData.thumbnail) {
            setThumbnailPreview('');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(formData.thumbnail);
        reader.onload = (e) => {
            setThumbnailPreview(e.target.result); // 미리보기 이미지 설정
        };
    }, [formData.thumbnail]);

    // 썸네일 이미지 업로드 핸들러
    const handleThumbnailChange = (event) => {
        const file = event.target.files[0]; // 첫 번째 파일 선택
        if (file) {
            setFormData({ ...formData, thumbnail: file }); // 파일 객체를 formData 상태에 저장
        }
    };

    // 썸네일 드래그 앤 드롭 핸들러
    const handleThumbnailDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0]; // 드롭한 첫 번째 파일 선택
        if (file) {
            setFormData({ ...formData, thumbnail: file }); // 파일 객체를 formData 상태에 저장
        }
    };

    return (
        <>
            {/* 썸네일 이미지 업로드 섹션 */}
            <Box sx={{ width: '100%', padding: '15px', borderBottom: '1px solid #ccc', height: 'auto' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography sx={{ minWidth: '15%', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        대표 이미지
                    </Typography>
                    {/* 썸네일 이미지 업로드 영역 */}
                    <Box
                        sx={{
                            width: '50%',
                            height: '250px',
                            backgroundColor: formData.thumbnail ? 'transparent' : '#e0e0e0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ddd',
                            cursor: 'pointer',
                            position: 'relative',
                            color:'#777777',
                            fontSize:'1.125rem'
                        }}
                        onClick={() => document.querySelector('#thumbnailInput').click()} // 클릭으로 파일 업로드
                        onDrop={handleThumbnailDrop} // 드래그 앤 드롭으로 파일 업로드
                        onDragOver={(e) => e.preventDefault()} // 드래그 중 기본 이벤트 방지
                    >
                        <input
                            type="file"
                            id="thumbnailInput"
                            style={{ display: 'none' }}
                            onChange={handleThumbnailChange} // 클릭으로 파일 선택
                        />
                        {formData.thumbnail ? (
                            <img src={thumbnailPreview} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        ) : (
                            '썸네일 이미지'
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ThumbnailUpload;
