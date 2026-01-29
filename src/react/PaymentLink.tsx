import { useState, useCallback, ReactNode } from 'react';
import { usePhaJayClient } from './PhaJayProvider';
import { PaymentLinkRequest, PaymentLinkResponse } from '../types';

export interface PaymentLinkProps extends Omit<PaymentLinkRequest, 'amount'> {
  amount: number;
  children?: ReactNode;
  onSuccess?: (response: PaymentLinkResponse) => void;
  onError?: (error: Error) => void;
  onLoading?: (loading: boolean) => void;
  className?: string;
  disabled?: boolean;
  autoRedirect?: boolean;
}

/**
 * Payment Link Component
 * Creates a payment link and automatically redirects user to payment page by default
 * 
 * @example
 * ```tsx
 * <PaymentLink
 *   amount={50000}
 *   description="Premium subscription"
 *   orderNo="ORDER_123"
 *   onSuccess={(response) => {
 *     console.log('Payment link created:', response.redirectURL);
 *     // Auto redirect is enabled by default
 *   }}
 *   onError={(error) => {
 *     console.error('Error creating payment link:', error);
 *   }}
 * >
 *   Pay Now
 * </PaymentLink>
 * ```
 */
export function PaymentLink({
  amount,
  description,
  orderNo,
  tag1,
  tag2,
  tag3,
  children = 'Create Payment Link',
  onSuccess,
  onError,
  onLoading,
  className = '',
  disabled = false,
  autoRedirect = true
}: PaymentLinkProps) {
  const client = usePhaJayClient();
  const [loading, setLoading] = useState(false);

  const handleCreatePaymentLink = useCallback(async () => {
    if (disabled || loading) return;

    try {
      setLoading(true);
      onLoading?.(true);

      const response = await client.paymentLink.createPaymentLink({
        amount,
        description,
        orderNo,
        tag1,
        tag2,
        tag3
      });

      onSuccess?.(response);

      // Auto redirect if enabled
      if (autoRedirect && response.redirectURL) {
        window.location.href = response.redirectURL;
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
    orderNo,
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
    const baseClasses = ['phajay-payment-base'];
    if (loading) baseClasses.push('loading');
    // Add custom className first for higher specificity
    if (className) baseClasses.push(className);
    return baseClasses.join(' ');
  };

  return (
    <button
      onClick={handleCreatePaymentLink}
      disabled={disabled || loading}
      className={getButtonClasses()}
    >
      {loading ? 'Creating...' : children}
    </button>
  );
}
