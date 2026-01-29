# PhaJay Payment SDK Demo

This is a demo React application showcasing the PhaJay Payment SDK integration.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Update Secret Key**
   Open `src/App.jsx` and replace the demo secret key with your actual PhaJay secret key:
   ```jsx
   const phaJayConfig = {
     secretKey: 'your-actual-secret-key-here' // Replace this
   }
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to http://localhost:5173

## Features Demonstrated

### 1. Payment Link
- Creates a payment link for online transactions
- Amount: 100 LAK (10,000 cents)
- Shows success/error handling

### 2. Payment QR Code  
- Generates QR codes for mobile payments
- Amount: 250 LAK (25,000 cents)
- Displays QR code for scanning

### 3. Credit Card Payment
- Processes credit card transactions
- Amount: 500 LAK (50,000 cents)
- Redirects to secure payment page

## Important Notes

⚠️ **Authentication Required**: The demo uses a placeholder secret key. You need to:

1. Get your actual secret key from PhaJay dashboard
2. Replace the demo key in `src/App.jsx`  
3. Ensure your secret key has proper permissions

## Error Handling

The demo includes comprehensive error handling:
- **401 Unauthorized**: Invalid or missing secret key
- **Network errors**: Connection issues
- **API errors**: Server-side validation failures

## Support

For issues with the PhaJay Payment SDK:
- Check the main SDK documentation
- Verify your secret key permissions
- Test with sandbox environment first

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
