import React from 'react'
import '../css/Mainpage.css';
import { BestProduct } from '../components/category/BestProduct';
import Conveyor from '../components/category/Conveyor';
import CarouselBanner from '../components/mainpage/CarouselBanner';
import {useSelector} from "react-redux";

export const Mainpage = () => {

    const nickname = useSelector(state => state.memberSlice.nickname);

    return (
    <div className='mp'>
        <div className='mp_container_title'>
          <h2>실시간경매</h2>
          <p>현재 진행중인 실시간 경매입니다.</p>
        </div>
        <div className='mp_container'>
            <div className='mp_banner'>
              <CarouselBanner/>
            </div>
            <div className='blank'/>
            <Conveyor/>
            <div className='blank'/>
          <div className='BestItems'>
            <h2 className='title'>베스트</h2>
            <p>입찰횟수가 많은 가장 인기 아이템들입니다.</p>
          </div>
          <BestProduct/>
          </div>
          
      <div className='blank'/>
        </div>
  )
}

export default Mainpage