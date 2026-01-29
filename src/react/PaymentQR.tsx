import { useState, useCallback, useEffect, useRef, ReactNode } from 'react';
import { usePhaJayClient } from './PhaJayProvider';
import { PaymentQRRequest, PaymentQRResponse, SupportedBank } from '../types';
import { QRSubscriptionService } from '../qr-subscription.service';

export interface PaymentQRProps extends Omit<PaymentQRRequest, 'amount' | 'bank'> {
  bank: SupportedBank | string;
  amount: number;
  children?: ReactNode;
  onSuccess?: (response: PaymentQRResponse) => void;
  onError?: (error: Error) => void;
  onLoading?: (loading: boolean) => void;
  // Payment subscription props (subscription is always enabled)
  onPaymentSuccess?: (paymentData: any) => void;
  onPaymentError?: (error: Error) => void;
  className?: string;
  disabled?: boolean;
}

/**
 * Payment QR Component with Automatic Real-time Payment Subscription
 * Generates QR code for bank-specific payments and automatically listens for payment status
 * 
 * @example
 * ```tsx
 * <PaymentQR
 *   bank="BCEL"
 *   amount={25000}
 *   description="Coffee payment"
 *   tag1="shop_123"
 *   onSuccess={(response) => {
 *     console.log('QR generated:', response.qrCode);
 *     console.log('Deep link:', response.link);
 *   }}
 *   onPaymentSuccess={(paymentData) => {
 *     console.log('Payment received!', paymentData);
 *     alert('Payment successful!');
 *   }}
 *   onPaymentError={(error) => {
 *     console.log('Payment failed:', error);
 *   }}
 * >
 *   Generate QR Code
 * </PaymentQR>
 * ```
 */
export function PaymentQR({
  bank,
  amount,
  description,
  tag1,
  tag2,
  tag3,
  children = 'Generate QR Code',
  onSuccess,
  onError,
  onLoading,
  onPaymentSuccess,
  onPaymentError,
  className = '',
  disabled = false
}: PaymentQRProps) {
  const client = usePhaJayClient();
  const [loading, setLoading] = useState(false);
  const subscriptionRef = useRef<QRSubscriptionService | null>(null);

  // Start payment subscription (always enabled when QR is generated)
  const startPaymentSubscription = useCallback(async (transactionId: string) => {
    if (!client) {
      console.warn('Client not available for subscription');
      return;
    }

    try {
      console.log('🔔 Starting payment subscription for transaction:', transactionId);

      // Check if client config exists
      if (!(client as any).paymentQR?.config?.secretKey) {
        console.error('❌ Client configuration or secret key not found');
        onPaymentError?.(new Error('Secret key not available for subscription'));
        return;
      }

      const subscription = new QRSubscriptionService({
        socketUrl: 'https://payment-gateway.phajay.co/',
        secretKey: (client as any).paymentQR.config.secretKey,
        onPaymentReceived: (paymentData) => {
          console.log('💰 Payment received:', paymentData);
          if (paymentData.transactionId === transactionId) {
            onPaymentSuccess?.(paymentData);
            stopPaymentSubscription();
          }
        },
        onError: (error) => {
          console.error('❌ Subscription error:', error);
          onPaymentError?.(error);
        },
        onConnect: () => {
          console.log('✅ Subscription connected');
        },
        onDisconnect: () => {
          console.log('❌ Subscription disconnected');
        }
      });

      subscriptionRef.current = subscription;
      await subscription.connect();

    } catch (error) {
      console.error('Failed to start payment subscription:', error);
      const errorObj = error instanceof Error ? error : new Error(String(error));
      onPaymentError?.(errorObj);
    }
  }, [client, onPaymentSuccess, onPaymentError]);

  // Stop payment subscription
  const stopPaymentSubscription = useCallback(() => {
    if (subscriptionRef.current) {
      console.log('⏹️ Stopping payment subscription');
      subscriptionRef.current.disconnect();
      subscriptionRef.current = null;
    }
  }, []);

  // Cleanup subscription on unmount
  useEffect(() => {
    return () => {
      stopPaymentSubscription();
    };
  }, [stopPaymentSubscription]);

  const generateQRCode = useCallback(async () => {
    if (disabled || loading) return;

    try {
      setLoading(true);
      onLoading?.(true);

      const response = await client.paymentQR.generateQR({
        bank: bank as SupportedBank,
        amount,
        description,
        tag1,
        tag2,
        tag3
      });

      onSuccess?.(response);

      // Start payment subscription automatically
      if (response.transactionId) {
        startPaymentSubscription(response.transactionId);
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
    bank,
    amount,
    description,
    tag1,
    tag2,
    tag3,
    onSuccess,
    onError,
    onLoading,
    disabled,
    loading
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
      onClick={generateQRCode}
      disabled={disabled || loading}
      className={getButtonClasses()}
    >
      {loading ? 'Generating...' : children}
    </button>
  );
}
