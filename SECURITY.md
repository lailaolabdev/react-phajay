# Security Policy

## Supported Versions

We actively maintain security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 3.x.x   | :white_check_mark: |
| 2.x.x   | :x:                |
| 1.x.x   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within React PhaJay, please send an email to security@phajay.com. All security vulnerabilities will be promptly addressed.

Please do **not** report security vulnerabilities through public GitHub issues.

### What to Include

When reporting a vulnerability, please include:

- A description of the vulnerability
- Steps to reproduce the issue
- Potential impact of the vulnerability
- Any suggested fixes (if you have them)

### Response Timeline

- **Initial Response**: Within 24 hours
- **Status Update**: Within 7 days
- **Resolution**: Within 30 days (for critical vulnerabilities)

## Security Considerations

### API Keys and Secrets

- Never commit API keys or secrets to version control
- Store sensitive information in environment variables
- Use different keys for development and production

### Payment Data

- This SDK does not store or process sensitive payment data
- All payment processing is handled securely by PhaJay's servers
- Follow PCI DSS guidelines when handling payment information

### HTTPS Requirements

- Always use HTTPS in production environments
- React PhaJay will reject non-HTTPS requests in production mode

### WebSocket Security

- Real-time payment subscriptions use secure WebSocket connections
- Connection channels are tied to specific secret keys
- Automatic disconnection after payment completion or timeout

## Best Practices

1. **Keep Dependencies Updated**: Regularly update React PhaJay and its dependencies
2. **Environment Separation**: Use separate API keys for different environments
3. **Error Handling**: Implement proper error handling to avoid information disclosure
4. **Logging**: Avoid logging sensitive information in production
5. **Validation**: Always validate payment responses on your server

## Contact

For security-related questions or concerns:
- Email: security@phajay.com
- Documentation: https://docs.phajay.com/security
