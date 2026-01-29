// Import default styles
import './styles.css';

// Payment Components
export { PaymentLink } from './PaymentLink';
export { PaymentQR } from './PaymentQR';
export { PaymentCreditCard } from './PaymentCreditCard';

// Provider and Hooks
export { PhaJayProvider, usePhaJayClient } from './PhaJayProvider';

// Component-specific types only (avoid conflicts with main SDK types)
export type { PaymentLinkProps } from './PaymentLink';
export type { PaymentQRProps } from './PaymentQR';
export type { PaymentCreditCardProps } from './PaymentCreditCard';
export type { PhaJayProviderProps } from './PhaJayProvider';
