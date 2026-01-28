import { useState, useCallback, ReactNode } from 'react';
import { usePhaJayClient } from './PhaJayProvider';
import { PaymentQRRequest, PaymentQRResponse, SupportedBank } from '../types';

export interface PaymentQRProps extends Omit<PaymentQRRequest, 'amount' | 'bank'> {
  bank: SupportedBank | string;
  amount: number;
  children?: ReactNode;
  onSuccess?: (response: PaymentQRResponse) => void;
  onError?: (error: Error) => void;
  onLoading?: (loading: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  showQRCode?: boolean;
  showDeepLink?: boolean;
  qrCodeSize?: number;
}

/**
 * Payment QR Component
 * Generates QR code for bank-specific payments
 * 
 * @example
 * ```tsx
 * <PaymentQR
 *   bank="BCEL"
 *   amount={25000}
 *   description="Coffee payment"
 *   tag1="shop_123"
 *   showQRCode={true}
 *   onSuccess={(response) => {
 *     console.log('QR generated:', response.qrCode);
 *     console.log('Deep link:', response.link);
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
  className = '',
  style = {},
  disabled = false,
  showQRCode = false,
  showDeepLink = false,
  qrCodeSize = 200
}: PaymentQRProps) {
  const client = usePhaJayClient();
  const [loading, setLoading] = useState(false);
  const [qrResponse, setQrResponse] = useState<PaymentQRResponse | null>(null);

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

      setQrResponse(response);
      onSuccess?.(response);

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

  const buttonStyle: React.CSSProperties = {
    padding: '12px 24px',
    backgroundColor: loading ? '#cccccc' : '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: loading || disabled ? 'not-allowed' : 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
    opacity: disabled ? 0.6 : 1,
    marginBottom: showQRCode || showDeepLink ? '16px' : '0',
    ...style
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px'
  };

  const qrImageStyle: React.CSSProperties = {
    width: qrCodeSize,
    height: qrCodeSize,
    border: '2px solid #ddd',
    borderRadius: '8px',
    padding: '8px'
  };

  const linkStyle: React.CSSProperties = {
    padding: '8px 16px',
    backgroundColor: '#17a2b8',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold'
  };

  return (
    <div className={`phajay-payment-qr ${className}`} style={containerStyle}>
      <button
        onClick={generateQRCode}
        disabled={disabled || loading}
        style={buttonStyle}
      >
        {loading ? 'Generating...' : children}
      </button>

      {qrResponse && showQRCode && qrResponse.qrCode && (
        <div>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>
            QR Code for {bank} Bank:
          </p>
          <img
            src={`data:image/png;base64,${qrResponse.qrCode}`}
            alt={`QR Code for ${bank}`}
            style={qrImageStyle}
          />
        </div>
      )}

      {qrResponse && showDeepLink && qrResponse.link && (
        <a
          href={qrResponse.link}
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          Open in {bank} App
        </a>
      )}
    </div>
  );
}
