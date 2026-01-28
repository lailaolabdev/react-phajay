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
  style?: React.CSSProperties;
  disabled?: boolean;
  autoRedirect?: boolean;
}

/**
 * Payment Credit Card Component
 * Creates credit card payment and optionally redirects to payment page
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
 *   }}
 *   autoRedirect={true}
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
  style = {},
  disabled = false,
  autoRedirect = false
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

  const buttonStyle: React.CSSProperties = {
    padding: '12px 24px',
    backgroundColor: loading ? '#cccccc' : '#dc3545',
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
      onClick={handleCreatePayment}
      disabled={disabled || loading}
      className={`phajay-payment-credit-card ${className}`}
      style={buttonStyle}
    >
      {loading ? 'Processing...' : children}
    </button>
  );
}
