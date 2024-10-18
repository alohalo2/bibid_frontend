import React, { useState } from 'react';
import CategoryItemDetailInfo from './CatItDetInfo';
import CategoryItemDetailInquiry from './CatItDetInquiry';
import CategoryItemDetailReturn from './CatItDetReturn';
import CategoryItemDetailMain from './CatItDetMain';
import CatItDetAxios from './CatItDetAxios';

const CategoryItemDetail = () => {
    const [auctionItem, setAuctionItem] = useState(null);
    const [auctionBidInfo, setAuctionBidInfo] = useState(null);
    const [seller, setSeller] = useState(null);

    return (
        <div className='CID-item-block'>
            
            <CatItDetAxios
                setAuctionItem={setAuctionItem}
                setAuctionBidInfo={setAuctionBidInfo}
                setSeller={setSeller}
            />

            <CategoryItemDetailMain auctionItem = {auctionItem} auctionBidInfo = {auctionBidInfo} seller = {seller}/>
            <CategoryItemDetailInfo auctionItem = {auctionItem} auctionBidInfo = {auctionBidInfo} seller = {seller}/>
            <CategoryItemDetailInquiry auctionItem = {auctionItem} auctionBidInfo = {auctionBidInfo} seller = {seller}/>
            <CategoryItemDetailReturn/>
        </div>
    );
};

export default CategoryItemDetail;