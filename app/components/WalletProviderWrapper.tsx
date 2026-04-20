'use client';

import { useMemo } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

console.log('[WalletProviderWrapper] Client component module loaded');

interface WalletProviderWrapperProps {
  children: React.ReactNode;
}

export default function WalletProviderWrapper({ children }: WalletProviderWrapperProps) {
  console.log('[WalletProviderWrapper] Component rendering');

  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => {
    console.log('[WalletProviderWrapper] Computing endpoint');
    return clusterApiUrl(network);
  }, [network]);

  const wallets = useMemo(() => {
    console.log('[WalletProviderWrapper] Creating wallet adapters');
    try {
      const adapters = [new PhantomWalletAdapter()];
      console.log('[WalletProviderWrapper] Wallet adapters created successfully');
      return adapters;
    } catch (error) {
      console.error('[WalletProviderWrapper] Error creating wallet adapters:', error);
      return [];
    }
  }, []);

  console.log('[WalletProviderWrapper] Rendering providers');

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}