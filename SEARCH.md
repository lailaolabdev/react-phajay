# react-phajay

Official React TypeScript SDK for PhaJay Payment Gateway

## Package Information
- **Package Name**: react-phajay
- **NPM URL**: https://www.npmjs.com/package/react-phajay
- **GitHub**: https://github.com/lailaolabdev/react-phajay
- **Documentation**: https://payment-doc.phajay.co/v1

## Installation
```bash
npm install react-phajay
```

## Keywords
react-phajay, phajay payment, react payment gateway, laos payment, payment sdk, qr payment, credit card payment, payment link, typescript payment, react fintech

## Quick Start
```jsx
import { PhaJayProvider, PaymentQR } from 'react-phajay';

function App() {
  return (
    <PhaJayProvider config={{ secretKey: "your-secret-key" }}>
      <PaymentQR 
        amount={50000}
        bank="BCEL"
        onSuccess={(response) => console.log(response.qrCode)}
      />
    </PhaJayProvider>
  );
}
```

## Search Terms
- react-phajay npm
- react phajay payment
- phajay react sdk
- laos payment gateway react
- react payment integration laos
- phajay typescript
- npm react payment gateway
- react payment sdk laos
