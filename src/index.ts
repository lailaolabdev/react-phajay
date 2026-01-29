// Import React Component Styles (must be first)
import './react/styles.css';

// Main exports
export { PhaJayClient } from './phajay-client';

// Services
export { PaymentLinkService } from './payment-link.service';
export { PaymentQRService } from './payment-qr.service';
export { CreditCardService } from './credit-card.service';
export { QRSubscriptionService } from './qr-subscription.service';

// Types and interfaces
export * from './types';

// React Components - Export everything from react folder
export { PhaJayProvider } from './react/PhaJayProvider';
export { PaymentQR } from './react/PaymentQR';
export { PaymentLink } from './react/PaymentLink';
export { PaymentCreditCard } from './react/PaymentCreditCard';

// React Component Types
export type { 
  PhaJayProviderProps,
  PaymentQRProps,
  PaymentLinkProps,
  PaymentCreditCardProps
} from './react/index';

// Re-export the main client as default
import { PhaJayClient } from './phajay-client';
export default PhaJayClient;
