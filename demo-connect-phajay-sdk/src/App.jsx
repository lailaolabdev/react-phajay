import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { PhaJayProvider, PaymentLink, PaymentQR, PaymentCreditCard } from 'phajay-payment-sdk/react'
import QRCode from 'react-qr-code'

function App() {
  const [count, setCount] = useState(0)
  const [error, setError] = useState(null)
  const [qrCode, setQrCode] = useState(null)

  // PhaJay configuration
  const phaJayConfig = {
    secretKey: '$2a$10$7pBgohWIIovcMxeAr7ItX.W1TkCkSIFZeRIjkTb3ZPvooztM8Kl0S' // Demo secret key (replace with real key for actual use)
  }

  // Debug: Log the config to console
  console.log('PhaJay Config:', phaJayConfig)

  // If there's an error, show it
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={() => setError(null)}>Try Again</button>
      </div>
    )
  }

  try {
    return (
    <PhaJayProvider config={phaJayConfig}>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>PhaJay Payment Demo</h1>
      
      {/* Counter Section */}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      {/* PhaJay Payment Components */}
      <div className="payment-demos">
        <h2>PhaJay Payment Components</h2>
        
        <div className="payment-section">
          <h3>1. Payment Link</h3>
          <div style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
            Styled with CSS classes (see App.css for .phajay-payment-link)
          </div>
          <PaymentLink 
            amount={1}
            description="Test Payment Link"
            onSuccess={(response) => {
              console.log('Payment Link created:', response);
            }}
            onError={(error) => {
              console.error('Payment Link error:', error);
              console.error('Error details:', error);
              
              // Show detailed error information
              let errorMessage = `Error: ${error.message}`;
              if (error.code === '401') {
                errorMessage += '\n\nThis is likely because:';
                errorMessage += '\n1. The secret key is not valid';
                errorMessage += '\n2. You need to replace it with your actual PhaJay secret key';
                errorMessage += '\n3. The API endpoint requires proper authentication';
              }
              alert(errorMessage);
            }}
          >
            Create Payment Link (1 LAK)
          </PaymentLink>
          
          {/* Custom styled button example */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
              Custom styled button with CSS classes:
            </div>
            <PaymentLink
              amount={2}
              description="Custom Styled Payment"
              className="custom-payment-button"
              onSuccess={(response) => {
                console.log("response:", response);
              }}
              onError={(error) => {
                alert(`Error: ${error.message}`);
              }}
            >
              🎨 Custom Styled Button (2 LAK)
            </PaymentLink>
          </div>
        </div>

        <div className="payment-section">
          <h3>2. Payment QR Code with Real-time Subscription</h3>
          <div style={{ marginBottom: '15px', fontSize: '14px', color: '#666' }}>
            Styled with CSS classes (see App.css for .phajay-payment-qr-button)
          </div>
          <div className="qr-info">
            <p><strong>Bank:</strong> BCEL (Banque pour le Commerce Extérieur Lao)</p>
            <p><strong>Amount:</strong> 1 LAK (1 cent)</p>
            <p><strong>Description:</strong> Test QR Payment</p>
            <p><strong>Real-time Updates:</strong> ✅ Always enabled automatically</p>
          </div>
          <PaymentQR
            bank='BCEL'
            amount={1}
            description="Test QR Payment"
            tag1="demo_app"
            tag2="qr_test"
            showQRCode={true}
            showDeepLink={true}
            qrCodeSize={200}
            onSuccess={(response) => {
              console.log('QR Payment created:', response);
              console.log('QR Code data:', response.qrCode);
              console.log('Deep link:', response.link);
              console.log('Transaction ID:', response.transactionId);
              setQrCode(response.qrCode);
            }}
            onError={(error) => {
              console.error('QR Payment error:', error);
              alert(`Error generating QR code: ${error.message}`);
            }}
            onLoading={(isLoading) => {
              console.log('QR Loading state:', isLoading);
            }}
            onPaymentSuccess={(paymentData) => {
              console.log('🎉 Payment received via subscription!', paymentData);
              // Clear QR code after successful payment
              setQrCode(null);
            }}
            onPaymentError={(error) => {
              console.error('💥 Payment subscription error:', error);
            }}
          >
            📱 Generate BCEL QR Code (Auto Real-time Monitoring)
          </PaymentQR>
          
          {/* QR Code Display */}
          {qrCode && (
            <div className="qr-display">
              <h4>🎯 Generated QR Code</h4>
              <div className="qr-container">
                <QRCode 
                  value={qrCode}
                  size={200}
                  style={{ 
                    height: "200px",
                    maxWidth: "200px",
                    width: "200px",
                    border: "4px solid #28a745",
                    borderRadius: "12px",
                    padding: "16px",
                    backgroundColor: "white"
                  }}
                />
              </div>
              <div className="qr-instructions">
                <p>📱 <strong>How to use:</strong></p>
                <ol>
                  <li>Open your BCEL One app</li>
                  <li>Tap on QR Scanner</li>
                  <li>Scan the QR code above</li>
                  <li>Confirm payment of 1 LAK</li>
                  <li>🎯 Payment status will update automatically!</li>
                </ol>
                <div style={{ marginTop: '12px', padding: '8px', backgroundColor: '#e8f5e8', borderRadius: '4px' }}>
                  <p style={{ margin: '0', fontSize: '12px', color: '#2d5a2d' }}>
                    💡 <strong>Auto Real-time:</strong> Payment monitoring starts automatically when QR is generated - no configuration needed!
                  </p>
                </div>
                <div style={{ marginTop: '8px', padding: '8px', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
                  <p style={{ margin: '0', fontSize: '11px', color: '#856404' }}>
                    ⚠️ <strong>Demo Mode:</strong> If real-time connection fails, the system will simulate a payment success after 10 seconds for testing purposes.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setQrCode(null)} 
                className="clear-qr-btn"
              >
                🗑️ Clear QR Code
              </button>
            </div>
          )}
        </div>

        <div className="payment-section">
          <h3>3. Credit Card Payment</h3>
          <PaymentCreditCard
            amount={1}
            description="Test Credit Card Payment"
            onSuccess={(response) => {
              console.log('Credit Card Payment created:', response);
            }}
            onError={(error) => {
              console.error('Credit Card Payment error:', error);
              alert(`Error: ${error.message}`);
            }}
          >
            Pay with Credit Card (500 LAK)
          </PaymentCreditCard>
        </div>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </PhaJayProvider>
  )
  } catch (err) {
    return (
      <div>
        <h1>PhaJay Error</h1>
        <p style={{ color: 'red' }}>Error: {err.message}</p>
        <p>Please check your configuration and try again.</p>
      </div>
    )
  }
}

export default App
