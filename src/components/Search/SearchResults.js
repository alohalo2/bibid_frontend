import React from 'react'
import { useSelector } from 'react-redux';
import '../../css/Category.css';

const SearchResults = () => {
    const pageItems = useSelector(state => state.auction.pageItems);

    return (
        <div className='SR_container'>
            {pageItems && pageItems.content && pageItems.content.length > 0 ? (
                <ul>
                    {pageItems.content.map((auction) => (
                        <li key={auction.auctionIndex}>
                            Auction Index: {auction.auctionIndex}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
}

export default SearchResults