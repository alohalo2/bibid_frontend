import React from 'react'
import '../../css/Category.css';

const ProductLine = ({ products }) => {
  return (
    <div className='CTG_productLine'>
      <div className='CTG_grid-container-product'>
        {products.map((product) => (
          <div className='CTG_flex-item' key={product.id}>
            <div className="CTG_grid-item-product" style={{ backgroundImage: `url(${product.image})` }} />
            <div className='CTG_grid-item-text'>
              <div className='CTG_productText'>
                <p>{product.name}</p>
                <p>{product.price} 원</p>
                <p>입찰 {product.bids}회 | {product.timeLeft} </p>
                <p>{product.seller}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductLine