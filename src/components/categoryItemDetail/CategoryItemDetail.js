import React from 'react'
import CategoryItemDetailInfo from './CatItDetInfo';
import CategoryItemDetailInquiry from './CatItDetInquiry';
import CategoryItemDetailReturn from './CatItDetReturn';
import CategoryItemDetailMain from './CatItDetMain';
import CatItDetAxios from './CatItDetAxios';

const CategoryItemDetail = () => {

    const [response, setResponse] = useState(null);

    return (
        <div className='CID-item-block'>
            
            <CatItDetAxios setResponse={setResponse}/>

            <CategoryItemDetailMain response = {response}/>
            <CategoryItemDetailInfo response = {response}/>
            <CategoryItemDetailInquiry response = {response}/>
            <CategoryItemDetailReturn response = {response}/>
        </div>
    );
};

export default CategoryItemDetail;