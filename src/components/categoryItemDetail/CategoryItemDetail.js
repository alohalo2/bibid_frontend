import React from 'react'
import CategoryItemDetailInfo from './CatItDetInfo';
import CategoryItemDetailInquiry from './CatItDetInquiry';
import CategoryItemDetailReturn from './CatItDetReturn';
import CategoryItemDetailMain from './CatItDetMain';

const CategoryItemDetail = () => {
    return (
        <div className='CID-item-block'>
            <CategoryItemDetailMain/>
            <CategoryItemDetailInfo/>
            <CategoryItemDetailInquiry/>
            <CategoryItemDetailReturn/>
        </div>
    );
};

export default CategoryItemDetail;