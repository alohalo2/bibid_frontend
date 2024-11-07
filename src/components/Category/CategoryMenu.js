import React from 'react'
import { useNavigate } from 'react-router-dom';

const CategoryMenu = () => {

        const navi = useNavigate();

        // const toCategory = () => {
        //     navi('/category');
        // }

        // const toAll = () => {
        //   navi('/category/all');
        //   };

        // const toClothing = () => {
        //   navi('/category/clothing');
        //   };

        // const toHob = () => {
        //   navi('/category/hob');
        //   };

        // const toBook = () => {
        //   navi('/category/book');
        //   };

        // const toArt = () => {
        //   navi('/category/art');
        //   };

        // const toElec = () => {
        //   navi('/category/elec');
        //   };

        // const toPic = () => {
        //   navi('/category/pic');
        //   };

        // const toAntique = () => {
        //   navi('/category/antique');
        //   };

          const toCategory = () => {
            window.location.href ='/category';
        }
      
        const toAll = () => {
          window.location.href ='/category/all';
          };
      
        const toClothing = () => {
          window.location.href ='/category/clothing';
          };
      
        const toHob = () => {
          window.location.href ='/category/hob';
          };
          
        const toBook = () => {
          window.location.href ='/category/book';
          };
        
        const toArt = () => {
          window.location.href ='/category/art';
          };
      
        const toElec = () => {
          window.location.href = '/category/elec';
          };
      
        const toPic = () => {
          window.location.href = '/category/pic';
          };
        
        const toAntique = () => {
          window.location.href = '/category/antique';
          };

  return (
    <>
    <div className='CTG_Category-btn'>
        <div className='CTG_main-btn' onClick={toCategory}>
            <h1>Category</h1>
            </div>
          </div>
          <div className='CTG_grid-continer-0'>
              <div className="CTG_grid-item" onClick={toAll}>
                <img className="CTG_item-content" src='/images/전체메뉴.png'></img>
                <div className="CTG_item-text">
                  <p>전체보기</p>
                </div>
              </div>
          </div>
          <div className='CTG_stick'></div>
        <div className="CTG_grid-container">
              <div className="CTG_grid-item" onClick={toClothing}>
                <img className="CTG_item-content" src='/images/의류잡화.png'></img>
                <div className="CTG_item-text">
                  <p>의류 / 잡화</p>
                </div>
              </div>
              <div className="CTG_grid-item" onClick={toHob}>
                <img className="CTG_item-content" src='/images/취미수집.png'></img>
                <div className="CTG_item-text">
                  <p>취미 / 수집</p>
                </div>
              </div>
              <div className="CTG_grid-item" onClick={toBook}>
                <img className="CTG_item-content" src='/images/도서.png'></img>
                <div className="CTG_item-text">
                  <p>도서</p>
                </div>
              </div>
              <div className="CTG_grid-item" onClick={toArt}>
                <img className="CTG_item-content" src='/images/예술품.png'></img>
                <div className="CTG_item-text">
                  <p>예술품</p>
                </div>
              </div>
              <div className="CTG_grid-item-none" />
              <div className="CTG_grid-item" onClick={toElec}>
                <img className="CTG_item-content" src='/images/전자제품.png'></img>
                <div className="CTG_item-text">
                  <p>전자제품</p>
                </div>
              </div>
              <div className="CTG_grid-item" onClick={toPic}>
                <img className="CTG_item-content" src='/images/사진.png'></img>
                <div className="CTG_item-text">
                  <p>사진</p>
                </div>
              </div>
              <div className="CTG_grid-item" onClick={toAntique}>
                <img className="CTG_item-content" src='/images/골동품.png'></img>
                <div className="CTG_item-text">
                  <p>골동품</p>
                </div>
              </div>
              <div className="CTG_grid-item-none" />
          </div>
    </>
  )
}

export default CategoryMenu