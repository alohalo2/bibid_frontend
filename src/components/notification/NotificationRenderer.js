import React from 'react';
import HigherBidNotification from './HigherBidNotification';
import AuctionSoldNotification from './AuctionSoldNotification';
import PurchaseConfirmationNotification from './PurchaseConfirmationNotification';
import SaleConfirmationNotification from './SaleConfirmationNotification';
import ServerMaintenanceNotification from './ServerMaintenanceNotification';
import ExchangeNotification from './ExchangeNotification';
import DepositNotification from './DepositNotification';
import DirectMessageNotification from './DirectMessageNotification';
import AuctionStartNotification from './AuctionStartNotification';
import AuctionWinNotification from './AuctionWinNotification';

const NotificationRenderer = ({ notification }) => {
  switch (notification.notificationType) {
    case 'HIGHER_BID':
      return <HigherBidNotification notification={notification} />;
    case 'AUCTION_START':
      return <AuctionStartNotification notification={notification} />;
    case 'AUCTION_SOLD':
      return <AuctionSoldNotification notification={notification} />;
    case 'AUCTION_WIN':
      return <AuctionWinNotification notification={notification} />;
    case 'PURCHASE_CONFIRMATION':
      return <PurchaseConfirmationNotification notification={notification} />;
    case 'SALE_CONFIRMATION':
      return <SaleConfirmationNotification notification={notification} />;
    case 'SERVER_MAINTENANCE':
      return <ServerMaintenanceNotification notification={notification} />;
    case 'EXCHANGE_NOTIFICATION':
      return <ExchangeNotification notification={notification} />;
    case 'DEPOSIT_NOTIFICATION':
      return <DepositNotification notification={notification} />;
    case 'DIRECT_MESSAGE':
      return <DirectMessageNotification notification={notification} />;
    default:
      return <div>알 수 없는 알림 타입입니다.</div>;
  }
};

export default NotificationRenderer;
