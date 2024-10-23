import React from 'react'
import '../css/Category.css';
import Conveyor from '../components/Category/Conveyor';
import { useNavigate } from 'react-router-dom';
import CategoryMenu from '../components/Category/CategoryMenu';
import BestProduct_Hob from '../components/Category/BestProduct_Hob';
import { BestProduct } from '../components/Category/BestProduct';
import BestProduct_Clothing from '../components/Category/BestProduct_Clothing';
import BestProduct_Elec from '../components/Category/BestProduct_Elec';



const Category = () => {
  const navi = useNavigate();
      
        const toAll = () => {
          navi('/category/all');
          };
      
        const toClothing = () => {
          navi('/category/clothing');
          };
      
        const toHob = () => {
          navi('/category/hob');
          };
          
        const toBook = () => {
          navi('/categories/book', {replace: true});
          };
        
        const toArt = () => {
          navi('/categories/art', {replace: true});
          };
      
        const toElec = () => {
          navi('/category/elec');
          };
      
        const toPic = () => {
          navi('/categories/pic', {replace: true});
          };
        
        const toAntique = () => {
          navi('/categories/antique', {replace: true});
          };

  return (
    <div className='CTG_category'>
      <div className='blank'/>
      <div className='CTG_container'>
          <CategoryMenu/>
      </div>
      <div className='blank'/>
      <Conveyor/>
      <div className='blank'/>
      <div className='CTG_BestItems'>
        <p className='CTG_title'>베스트</p>
      </div>
      <BestProduct/>
      <div className='blank'/>
      <div className='CTG_BestItems'>
        <p className='CTG_title' onClick={toHob}>취미 / 수집</p>
        <p></p>
      </div>
      <BestProduct_Hob/>
      <div className='blank'/>
      <div className='CTG_BestItems'>
        <p className='CTG_title' onClick={toClothing}>의류 / 잡화</p>
        <p></p>
      </div>
      <BestProduct_Clothing/>
      <div className='blank'/>
      <div className='CTG_BestItems'>
        <p className='CTG_title' onClick={toElec}>전자제품</p>
        <p></p>
      </div>
      <BestProduct_Elec/>
      <div className='blank'/>
    </div>
  );
};

export default Category