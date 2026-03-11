import { useState, useCallback, ReactNode } from 'react';
import { usePhaJayClient } from './PhaJayProvider';
import { CreditCardRequest, CreditCardResponse } from '../types';

export interface PaymentCreditCardProps extends Omit<CreditCardRequest, 'amount'> {
  amount: number;
  children?: ReactNode;
  onSuccess?: (response: CreditCardResponse) => void;
  onError?: (error: Error) => void;
  onLoading?: (loading: boolean) => void;
  className?: string;
  disabled?: boolean;
  autoRedirect?: boolean;
  // Tailwind CSS support
  useTailwind?: boolean;
  tailwindClasses?: string;
}

/**
 * Payment Credit Card Component
 * Creates credit card payment and automatically redirects to payment page by default
 * 
 * @example
 * ```tsx
 * <PaymentCreditCard
 *   amount={100}
 *   description="Premium service"
 *   tag1="customer_123"
 *   onSuccess={(response) => {
 *     console.log('Payment URL:', response.paymentUrl);
 *     console.log('Transaction ID:', response.transactionId);
 *     // Auto redirect is enabled by default
 *   }}
 * >
 *   Pay with Credit Card
 * </PaymentCreditCard>
 * ```
 */
export function PaymentCreditCard({
  amount,
  description,
  tag1,
  tag2,
  tag3,
  children = 'Pay with Credit Card',
  onSuccess,
  onError,
  onLoading,
  className = '',
  disabled = false,
  autoRedirect = true,
  useTailwind = false,
  tailwindClasses = ''
}: PaymentCreditCardProps) {
  const client = usePhaJayClient();
  const [loading, setLoading] = useState(false);

  const handleCreatePayment = useCallback(async () => {
    if (disabled || loading) return;

    try {
      setLoading(true);
      onLoading?.(true);

      const response = await client.creditCard.createPayment({
        amount,
        description,
        tag1,
        tag2,
        tag3
      });

      onSuccess?.(response);

      // Auto redirect if enabled
      if (autoRedirect && response.paymentUrl) {
        window.location.href = response.paymentUrl;
      }

    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(String(error));
      onError?.(errorObj);
    } finally {
      setLoading(false);
      onLoading?.(false);
    }
  }, [
    client,
    amount,
    description,
    tag1,
    tag2,
    tag3,
    onSuccess,
    onError,
    onLoading,
    disabled,
    loading,
    autoRedirect
  ]);

  // Generate CSS class names based on state
  const getButtonClasses = () => {
    if (useTailwind) {
      // When using Tailwind, only use Tailwind classes
      const classes = ['phajay-tailwind-override', 'phajay-payment-base'];
      if (tailwindClasses) classes.push(tailwindClasses);
      if (className) classes.push(className);
      if (loading) classes.push('loading');
      return classes.join(' ');
    } else {
      // Default CSS behavior
      const baseClasses = ['phajay-payment-base'];
      if (loading) baseClasses.push('loading');
      if (className) baseClasses.push(className);
      return baseClasses.join(' ');
    }
  };

  return (
    <button
      onClick={handleCreatePayment}
      disabled={disabled || loading}
      className={getButtonClasses()}
    >
      {loading ? 'Processing...' : children}
    </button>
  );
}
