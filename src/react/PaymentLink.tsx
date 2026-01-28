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
  style?: React.CSSProperties;
  disabled?: boolean;
  autoRedirect?: boolean;
}

/**
 * Payment Link Component
 * Creates a payment link and optionally redirects user to payment page
 * 
 * @example
 * ```tsx
 * <PaymentLink
 *   amount={50000}
 *   description="Premium subscription"
 *   orderNo="ORDER_123"
 *   onSuccess={(response) => {
 *     console.log('Payment link created:', response.redirectURL);
 *     // Handle success - redirect or show link
 *   }}
 *   onError={(error) => {
 *     console.error('Error creating payment link:', error);
 *   }}
 *   autoRedirect={true}
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
  style = {},
  disabled = false,
  autoRedirect = false
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

  const buttonStyle: React.CSSProperties = {
    padding: '12px 24px',
    backgroundColor: loading ? '#cccccc' : '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: loading || disabled ? 'not-allowed' : 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
    opacity: disabled ? 0.6 : 1,
    ...style
  };

  return (
    <button
      onClick={handleCreatePaymentLink}
      disabled={disabled || loading}
      className={`phajay-payment-link ${className}`}
      style={buttonStyle}
    >
      {loading ? 'Creating...' : children}
    </button>
  );
}
