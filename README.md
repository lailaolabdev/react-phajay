# React PhaJay

Official React SDK for PhaJay Payment Gateway - Supporting Payment QR, Payment Link and Credit Card services in Lao PDR.

[![npm version](https://badge.fury.io/js/react-phajay.svg)](https://badge.fury.io/js/react-phajay)
[![Downloads](https://img.shields.io/npm/dm/react-phajay)](https://www.npmjs.com/package/react-phajay)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🏦 **Payment Links** - Single integration for all major Lao banks
- 📱 **QR Code Payments** - Bank-specific QR codes with real-time monitoring
- 💳 **Credit Card Payments** - Secure 3DS credit card processing
- ⚡ **React Components** - Ready-to-use components with TypeScript support
- 🎨 **Customizable** - Style with CSS classes, Tailwind CSS, or styled-components

## Installation

```bash
npm install react-phajay
```

## Quick Start

### 1. Setup Provider

```jsx
import { PhaJayProvider } from 'react-phajay';

function App() {
  return (
    <PhaJayProvider config={{ secretKey: "your-secret-key" }}>
      {/* Your payment components */}
    </PhaJayProvider>
  );
}
```

### 2. Payment Components

```jsx
import { PaymentQR, PaymentLink, PaymentCreditCard } from 'react-phajay';

// QR Code Payment
<PaymentQR 
  amount={50000}
  description="Coffee Payment"
  bank="BCEL"
  onSuccess={(response) => {
    console.log('QR Code:', response.qrCode);
    // Display QR code in your UI
  }}
  onPaymentSuccess={(data) => {
    console.log('Payment completed!', data);
  }}
/>

// Payment Link (redirects to payment page)
<PaymentLink 
  amount={100000}
  description="Order Payment"
  onSuccess={(response) => {
    // Auto redirects to payment page
    console.log('Redirecting to:', response.redirectURL);
  }}
/>

// Credit Card Payment (redirects to card form)
<PaymentCreditCard 
  amount={100}  // Amount in USD
  description="Premium Service"
  onSuccess={(response) => {
    // Auto redirects to card payment
    console.log('Payment URL:', response.paymentUrl);
  }}
/>
```

### 3. Custom Styling

```jsx
// Using CSS classes
<PaymentQR 
  amount={25000}
  bank="BCEL"
  className="bg-blue-500 text-white px-4 py-2 rounded"
  onSuccess={(response) => console.log(response.qrCode)}
>
  Generate QR Code
</PaymentQR>

// Using Tailwind CSS
<PaymentLink 
  amount={50000}
  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
>
  Create Payment Link
</PaymentLink>
```

## Configuration

Get your secret key from [PhaJay Portal](https://portal.phajay.co/):

1. Register and complete KYC verification
2. Go to Key Management to get your secret key
3. Configure callback URLs in Settings

```typescript
// Basic configuration
const client = new PhaJayClient({
  secretKey: 'your-secret-key' // Required
});
```

## Supported Banks

| Code | Bank Name |
|------|-----------|
| `BCEL` | Banque pour le Commerce Extérieur Lao |
| `JDB` | Joint Development Bank |
| `LDB` | Lao Development Bank |
| `IB` | Indochina Bank |
| `STB` | ST Bank Laos |

## Component Props Reference

### PaymentQR

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `amount` | `number` | ✅ | Payment amount in LAK |
| `bank` | `string` | ✅ | Bank code (BCEL, JDB, LDB, IB, STB) |
| `description` | `string` | ✅ | Payment description |
| `onSuccess` | `(response) => void` | ✅ | **Required:** Handle QR code data |
| `onPaymentSuccess` | `(data) => void` | ❌ | Real-time payment callback |
| `className` | `string` | ❌ | Custom CSS classes |
| `children` | `ReactNode` | ❌ | Button text (default: "Generate QR Code") |

### PaymentLink

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `amount` | `number` | ✅ | Payment amount in LAK |
| `description` | `string` | ✅ | Payment description |
| `onSuccess` | `(response) => void` | ❌ | Payment link created callback |
| `autoRedirect` | `boolean` | ❌ | Auto redirect (default: `true`) |
| `className` | `string` | ❌ | Custom CSS classes |
| `children` | `ReactNode` | ❌ | Button text (default: "Create Payment Link") |

### PaymentCreditCard

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `amount` | `number` | ✅ | Payment amount in USD |
| `description` | `string` | ✅ | Payment description |
| `onSuccess` | `(response) => void` | ❌ | Payment URL created callback |
| `autoRedirect` | `boolean` | ❌ | Auto redirect (default: `true`) |
| `className` | `string` | ❌ | Custom CSS classes |
| `children` | `ReactNode` | ❌ | Button text (default: "Pay with Credit Card") |

## Error Handling

```typescript
import { PhaJayAPIError } from 'react-phajay';

try {
  const paymentLink = await client.paymentLink.createPaymentLink({
    amount: 50000,
    description: 'Test payment'
  });
} catch (error) {
  if (error instanceof PhaJayAPIError) {
    console.error('API Error:', error.code, error.message);
  }
}
```

## Support & Documentation

- **Documentation**: [https://payment-doc.phajay.co/v1](https://payment-doc.phajay.co/v1)
- **Portal**: [https://portal.phajay.co](https://portal.phajay.co)
- **Issues**: [GitHub Issues](https://github.com/lailaolabdev/react-phajay/issues)

## License

MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [PhaJay Payment Gateway](https://www.phajay.co/en)
