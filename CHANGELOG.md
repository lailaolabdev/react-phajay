# Changelog

All notable changes to React PhaJay will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-29

### 🎉 Initial Release

#### Added
- � **Complete React SDK**: Full-featured payment SDK designed specifically for React applications
- ⚡ **Auto-CSS Injection**: Automatic styling without manual CSS imports
- 🔄 **Single Import**: Import everything from `'react-phajay'` - no subpaths needed
- � **Payment Methods**: PaymentLink, PaymentQR, and PaymentCreditCard components
- 📡 **Real-time Subscriptions**: Automatic WebSocket payment monitoring
- 🎨 **Customizable Styling**: Override default styles with className prop
- 📱 **Auto-Redirect**: Automatic redirection to payment pages (configurable)
- 🔒 **Type Safety**: Full TypeScript support with comprehensive type definitions

#### Core Components
- `PhaJayProvider` - Context provider for SDK configuration
- `PaymentQR` - QR code payment with real-time subscription
- `PaymentLink` - Multi-bank payment link generation
- `PaymentCreditCard` - Secure 3DS credit card processing

#### Features
- 🏦 **Multi-Bank Support**: JDB, LDB, IB, BCEL, STB
- � **Real-time Monitoring**: WebSocket-based payment callbacks
- 🎯 **Production Ready**: Comprehensive error handling and validation
- 📦 **Optimized Bundle**: 59.2 kB package size
- 🔧 **Developer Friendly**: Simple API with sensible defaults

### Changed
- 🏷️ **Package Name**: From `phajay-payment-sdk` → `react-phajay`
- 📦 **Repository**: Updated to `phajay/react-phajay`
- 🎯 **Import Structure**: Unified imports from single package

### Removed
- ❌ **Subpath Exports**: No more `/react` imports needed

### Added
- 🎨 **React Components** - Complete React component ecosystem with auto-styling
- ✨ **Auto CSS Injection** - CSS styles are automatically injected, no manual imports needed
- 🔄 **Automatic Payment Subscription** - Real-time payment monitoring starts automatically for QR payments
- 📱 **Custom Styling Support** - Easy customization with className props and CSS overrides
- 🏗️ **Production Build System** - Optimized Rollup configuration for production deployment

### Changed
- **Breaking**: Removed sandbox environment support (production only)
- **Breaking**: Removed `generateQRByBank()` and `generateQRByBankName()` methods
- **Breaking**: `enableSubscription` prop removed - subscription is always enabled for QR payments
- **Breaking**: Simplified component APIs with sensible defaults
- **Improved**: Better TypeScript type definitions and exports
- **Improved**: Enhanced error handling and logging

### Removed
- Sandbox environment support
- Unnecessary QR generation methods
- Manual subscription configuration requirements
- Complex styling setup requirements

### Fixed
- React version compatibility issues
- CSS injection problems in various build systems
- WebSocket connection stability
- Bundle size optimization

### Security
- Updated all dependencies to latest secure versions
- Improved API key handling and validation

## [1.2.0] - 2026-01-20

### Added
- WebSocket real-time payment subscription service
- Comprehensive TypeScript type definitions
- Jest testing framework integration

### Changed
- Improved API client architecture
- Better error handling and responses

## [1.1.0] - 2026-01-15

### Added
- Credit card payment support
- Payment link generation
- QR code payment functionality

### Changed
- Enhanced configuration options
- Improved documentation

## [1.0.0] - 2026-01-10

### Added
- Initial release of PhaJay Payment SDK
- Basic API client functionality
- TypeScript support
- ESM and CommonJS builds
