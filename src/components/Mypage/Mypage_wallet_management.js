import React, { useState } from 'react';
import sellerImageUrl from '../../images/seller_img.png';
import buyerImageUrl from '../../images/buyer_img.png';
import walletCashImageUrl from '../../images/wallet_cash_icon.png';
import walletExchangeImageUrl from '../../images/wallet_exchange_icon.png';

const Mypage_wallet_management = () => {

    return (
        <div className='etc1_wallet_management_container'>
            <h1>지갑 관리</h1>
            <div className='etc1_wallet_menu'>
                <div className='etc1_wallet_balance'>
                    <span className='etc1_wallet_balance_title'>금액</span>
                    <span className='etc1_wallet_balance_value'>1,586,000 원</span>
                </div>
                <div className='etc1_wallet_manage'>
                    <div className='etc1_bids_sell'>
                        <img src={sellerImageUrl}></img>
                        <span>판매</span>
                    </div>
                    <div className='etc1_bids_buy'>
                        <img src={buyerImageUrl}></img>
                        <span>구매</span>
                    </div>
                    <div className='etc1_wallet_charge'>
                        <img src={walletCashImageUrl}></img>
                        <span>충전</span>
                    </div>
                    <div className='etc1_wallet_exchange'>
                        <img src={walletExchangeImageUrl}></img>
                        <span>환전</span>
                    </div>
                </div>
            </div>
            <h3>결제 및 충전 내역</h3>
            <div className='etc1_cash_charge_history'>
                <div className='etc1_cash_charge_history_item'>
                    <img className='etc1_exchange_img_class' src={walletExchangeImageUrl}></img>
                    <div className='etc1_cash_charge_history_item_info'>
                        <div className='etc1_cash_charge_history_item_info_type_date'>
                            <span className='etc1_cash_charge_history_item_info_type'>환전</span>
                            <span className='etc1_cash_charge_history_item_info_date'>2024.09.21</span>
                        </div>
                        <span className='etc1_cash_charge_history_item_info_msg'>
                            요청하신 300,000원 환전 처리가 완료되었습니다.
                        </span>
                        <div className='etc1_cash_charge_history_item_info_calculate_balance'>
                            <span className='etc1_cash_charge_history_item_info_calculate'>
                                <strong className='etc1_balance_down'>- 300,000 원</strong>
                            </span>
                            <span className='etc1_cash_charge_history_item_info_balance'>
                                ￦ 1,586,000 원
                            </span>
                        </div>
                    </div>
                </div>
                <div className='etc1_cash_charge_history_item'>
                    <img className='etc1_seller_img_class' src={sellerImageUrl}></img>
                    <div className='etc1_cash_charge_history_item_info'>
                        <div className='etc1_cash_charge_history_item_info_type_date'>
                            <span className='etc1_cash_charge_history_item_info_type'>판매</span>
                            <span className='etc1_cash_charge_history_item_info_date'>2024.09.20</span>
                        </div>
                        <span className='etc1_cash_charge_history_item_info_msg'>
                            등록하신 "리미티드 에디션 금장 글라인더" 일반 경매 상품이 판매 및 배송 처리가 완료되었습니다.
                        </span>
                        <div className='etc1_cash_charge_history_item_info_calculate_balance'>
                            <span className='etc1_cash_charge_history_item_info_calculate'>
                                <strong className='etc1_balance_up'>+ 256,000 원</strong>
                            </span>
                            <span className='etc1_cash_charge_history_item_info_balance'>
                            ￦ 1,886,000 원
                            </span>
                        </div>
                    </div>
                </div>
                <div className='etc1_cash_charge_history_item'>
                    <img className='etc1_buyer_img_class' src={buyerImageUrl}></img>
                    <div className='etc1_cash_charge_history_item_info'>
                        <div className='etc1_cash_charge_history_item_info_type_date'>
                            <span className='etc1_cash_charge_history_item_info_type'>구매</span>
                            <span className='etc1_cash_charge_history_item_info_date'>2024.09.17</span>
                        </div>
                        <span className='etc1_cash_charge_history_item_info_msg'>
                        “삼국지 소설 전권” 상품을 일반 경매(즉시 구매가)로 구매 및 배송 처리가 완료되었습니다.
                        </span>
                        <div className='etc1_cash_charge_history_item_info_calculate_balance'>
                            <span className='etc1_cash_charge_history_item_info_calculate'>
                                <strong className='etc1_balance_up'>+ 400,000 원</strong>
                            </span>
                            <span className='etc1_cash_charge_history_item_info_balance'>
                            ￦ 1,630,000 원
                            </span>
                        </div>
                    </div>
                </div>
                <div className='etc1_cash_charge_history_item'>
                    <img className='etc1_cash_img_class' src={walletCashImageUrl}></img>
                    <div className='etc1_cash_charge_history_item_info'>
                        <div className='etc1_cash_charge_history_item_info_type_date'>
                            <span className='etc1_cash_charge_history_item_info_type'>충전</span>
                            <span className='etc1_cash_charge_history_item_info_date'>2024.09.10</span>
                        </div>
                        <span className='etc1_cash_charge_history_item_info_msg'>
                        요청하신 500,000 원 충전 처리가 완료되었습니다.
                        </span>
                        <div className='etc1_cash_charge_history_item_info_calculate_balance'>
                            <span className='etc1_cash_charge_history_item_info_calculate'>
                                <strong className='etc1_balance_up'>+ 500,000 원</strong>
                            </span>
                            <span className='etc1_cash_charge_history_item_info_balance'>
                            ￦ 2,030,000 원
                            </span>
                        </div>
                    </div>
                </div>
                <div className='etc1_cash_charge_history_item'>
                    <img className='etc1_buyer_img_class' src={buyerImageUrl}></img>
                    <div className='etc1_cash_charge_history_item_info'>
                        <div className='etc1_cash_charge_history_item_info_type_date'>
                            <span className='etc1_cash_charge_history_item_info_type'>구매</span>
                            <span className='etc1_cash_charge_history_item_info_date'>2024.09.05</span>
                        </div>
                        <span className='etc1_cash_charge_history_item_info_msg'>
                        “귀멸의 칼날 렌고쿠 쿄주로 피규어” 상품을 실시간 경매로 구매 및 배송 처리가 완료되었습니다.
                        </span>
                        <div className='etc1_cash_charge_history_item_info_calculate_balance'>
                            <span className='etc1_cash_charge_history_item_info_calculate'>
                                <strong className='etc1_balance_up'>+ 500,000 원</strong>
                            </span>
                            <span className='etc1_cash_charge_history_item_info_balance'>
                            ￦ 2,030,000 원
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <button className='etc1_charge_btn'>충전</button>
        </div>
    );
};

export default Mypage_wallet_management;