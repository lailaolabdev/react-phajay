// Main exports
export { PhaJayClient } from './phajay-client';

// Services
export { PaymentLinkService } from './payment-link.service';
export { PaymentQRService } from './payment-qr.service';
export { CreditCardService } from './credit-card.service';
export { QRSubscriptionService } from './qr-subscription.service';

// Types and interfaces
export * from './types';

// React Components (conditionally exported)
export {
  PhaJayProvider,
  usePhaJayClient,
  PaymentLink,
  PaymentQR,
  PaymentCreditCard
} from './react';

export type {
  PhaJayProviderProps,
  PaymentLinkProps,
  PaymentQRProps,
  PaymentCreditCardProps
} from './react';

// Re-export the main client as default
import { PhaJayClient } from './phajay-client';
export default PhaJayClient;
