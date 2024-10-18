import React from 'react'
import { useNavigate } from 'react-router-dom';

const CategoryMenu = () => {

        const navi = useNavigate();

        const toCategory = () => {
            navi('/category', {replace: true});
        }
      
        const toAll = () => {
          navi('/category/all', {replace: true});
          };
      
        const toClothing = () => {
          navi('/category/clothing', {replace: true});
          };
      
        const toHob = () => {
          navi('/category/hob', {replace: true});
          };
          
        const toBook = () => {
          navi('/category/book', {replace: true});
          };
        
        const toArt = () => {
          navi('/category/art', {replace: true});
          };
      
        const toElec = () => {
          navi('/category/elec', {replace: true});
          };
      
        const toPic = () => {
          navi('/category/pic', {replace: true});
          };
        
        const toAntique = () => {
          navi('/category/antique', {replace: true});
          };

  return (
    <>
    <div className='CTG_Category-btn'>
        <div className='CTG_main-btn' onClick={toCategory}>
            <h1>Category</h1>
            <p>주요 카테고리</p>
            </div>
          </div>
          <div className='CTG_grid-continer-0'>
              <div className="CTG_grid-item" onClick={toAll}>
                <img className="CTG_item-content" src='/images/전체메뉴.png'></img>
                <div className="CTG_item-text">전체보기</div>
              </div>
          </div>
          <div className='CTG_stick'></div>
        <div className="CTG_grid-container">
              <div className="CTG_grid-item" onClick={toClothing}>
                <img className="CTG_item-content" src='/images/의류잡화.png'></img>
                <div className="CTG_item-text">의류 / 잡화</div>
              </div>
              <div className="CTG_grid-item" onClick={toHob}>
                <img className="CTG_item-content" src='/images/취미수집.png'></img>
                <div className="CTG_item-text">취미 / 수집</div>
              </div>
              <div className="CTG_grid-item" onClick={toBook}>
                <img className="CTG_item-content" src='/images/도서.png'></img>
                <div className="CTG_item-text">도서</div>
              </div>
              <div className="CTG_grid-item" onClick={toArt}>
                <img className="CTG_item-content" src='/images/예술품.png'></img>
                <div className="CTG_item-text">예술품</div>
              </div>
              <div className="CTG_grid-item-none" />
              <div className="CTG_grid-item" onClick={toElec}>
                <img className="CTG_item-content" src='/images/전자제품.png'></img>
                <div className="CTG_item-text">전자제품</div>
              </div>
              <div className="CTG_grid-item" onClick={toPic}>
                <img className="CTG_item-content" src='/images/사진.png'></img>
                <div className="CTG_item-text">사진</div>
              </div>
              <div className="CTG_grid-item" onClick={toAntique}>
                <img className="CTG_item-content" src='/images/골동품.png'></img>
                <div className="CTG_item-text">골동품</div>
              </div>
              <div className="CTG_grid-item-none" />
          </div>
    </>
  )
}

export default CategoryMenu