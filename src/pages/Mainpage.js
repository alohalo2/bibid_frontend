import React from 'react'
import '../css/Mainpage.css';
import { BestProduct } from '../components/Category/BestProduct';
import Conveyor from '../components/Category/Conveyor';
import CarouselBanner from '../components/Mainpage/CarouselBanner';

export const Mainpage = () => {
  return (
    <div className='mp'>
      <div className='blank'/>
        <div className='mp_container'>
            <div className='mp_banner'>
              <CarouselBanner/>
            </div>
            <div className='blank'/>
            <Conveyor/>
            <div className='blank'/>
          <div className='BestItems'>
            <p className='title'>베스트</p>
          </div>
          <BestProduct/>
          </div>
          
      <div className='blank'/>
        </div>
  )
}

export default Mainpage