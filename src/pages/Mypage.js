import React from 'react';
import '../css/Mypage/Mypage.css';
import Mypage_sidebar from '../components/Mypage/Mypage_sidebar';
import { Outlet } from 'react-router-dom';

const Mypage = () => {
	return (
        <div className='etc1_container'>
            <Mypage_sidebar/>
            <Outlet />
        </div>
	);
};

export default Mypage;