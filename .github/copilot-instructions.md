<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## PhaJay Payment SDK - Comprehensive TypeScript Library

This project is a complete payment gateway SDK for PhaJay services with both core API integration and React components.

### Project Structure
- **Core SDK**: TypeScript/JavaScript library (`src/`)
- **React Components**: Modern React 18 components (`src/react/`)
- **Demo Application**: Comprehensive demo (`demo-connect-phajay-sdk/`)
- **Real-time Features**: WebSocket payment subscription service

### Key Features Implementation

#### 1. Payment QR with Automatic Real-time Subscription ✨
- **PaymentQR Component**: WebSocket subscription starts automatically when QR is generated
- **Auto Real-time Detection**: No configuration needed - always monitors for payments
- **Event Callbacks**: `onPaymentSuccess`, `onPaymentError` (no `enableSubscription` prop needed)
- **Visual Status**: Automatic connection status indicators
- **WebSocket Service**: `QRSubscriptionService` handles live payment monitoring

```typescript
// Simplified usage - subscription is automatic!
<PaymentQR 
  amount={1}
  description="Test Payment"
  bank="BCEL"
  onPaymentSuccess={(data) => console.log('Payment received!', data)}
  onPaymentError={(error) => console.log('Payment error:', error)}
/>
```

#### 2. WebSocket Integration Architecture
- **Service**: `src/qr-subscription.service.ts` - Handles SocketIO connections
- **Events**: Real-time payment callbacks via `join::${secretKey}` channels
- **Error Handling**: Comprehensive reconnection and fallback logic
- **Browser Support**: Dynamic imports for optimal bundle size

#### 3. Demo Application Showcase
- **Location**: `demo-connect-phajay-sdk/`
- **Features**: Complete PhaJay integration with QR display and real-time subscription
- **QR Libraries**: Uses `react-qr-code` for display, `qrcode` for generation
- **UI/UX**: Professional payment interface with status indicators

### Development Guidelines

- [x] **Production Only**: Sandbox environment removed ✅
- [x] **Simplified API**: Removed unnecessary QR bank methods ✅  
- [x] **React Integration**: Complete component ecosystem ✅
- [x] **Browser Compatible**: Custom SimpleEventEmitter, browser base64 ✅
- [x] **Real-time Payments**: WebSocket subscription system ✅

### Build & Test
```bash
npm run build    # Builds both SDK and React components
npm test        # Runs comprehensive test suite
npm run demo    # Starts demo application with Vite
```

### Payment Subscription Details
The PaymentQR component now includes automatic real-time capabilities:

1. **Auto-Start Subscription**: Subscription begins immediately when QR code is generated
2. **Event Channel**: Subscribes to `join::${secretKey}` for payment notifications  
3. **Status Updates**: Real-time UI updates for connection status and payment events
4. **Error Recovery**: Automatic reconnection with demo mode fallback
5. **Zero Configuration**: No props needed - just use onPaymentSuccess callback

This creates the most seamless payment experience where users get instant feedback when payments are completed through their mobile banking apps, with zero configuration required.

---

- [x] Verify that the copilot-instructions.md file in the .github directory is created. ✅ Created
- [x] Clarify Project Requirements ✅ TypeScript npm library for PhaJay payment gateway with Payment QR, Payment Link, and Credit Card services  
- [x] Scaffold the Project ✅ Created TypeScript npm library structure with all service files
- [x] Customize the Project ✅ Implemented PhaJay payment services with Payment Link, QR, and Credit Card support
- [x] Install Required Extensions ✅ No extensions needed
- [x] Compile the Project ✅ Successfully built TypeScript to JavaScript, all tests pass  
- [x] Create and Run Task ✅ Created build and test task, runs successfully
- [x] Launch the Project ✅ No launch needed for npm library
- [x] Ensure Documentation is Complete ✅ README.md exists with comprehensive documentation, copilot-instructions.md updated with real-time subscription details
