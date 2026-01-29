import { createContext, useContext, ReactNode, useMemo } from 'react';
import { PhaJayClient } from '../phajay-client';
import { PhaJayConfig } from '../types';

interface PhaJayContextValue {
  client: PhaJayClient | null;
}

const PhaJayContext = createContext<PhaJayContextValue>({ client: null });

export interface PhaJayProviderProps {
  config: PhaJayConfig;
  children: ReactNode;
}

/**
 * PhaJay Provider Component
 * Wraps your app to provide PhaJay client instance to all payment components
 * 
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <PhaJayProvider config={{ secretKey: "your-secret-key" }}>
 *       <PaymentComponents />
 *     </PhaJayProvider>
 *   );
 * }
 * ```
 */
export function PhaJayProvider({ config, children }: PhaJayProviderProps) {
  const client = new PhaJayClient(config);

  return (
    <PhaJayContext.Provider value={{ client }}>
      {children}
    </PhaJayContext.Provider>
  );
}

/**
 * Hook to access PhaJay client instance
 */
export function usePhaJayClient(): PhaJayClient {
  const context = useContext(PhaJayContext);
  
  if (!context.client) {
    throw new Error('usePhaJayClient must be used within a PhaJayProvider');
  }
  
  return context.client;
}
