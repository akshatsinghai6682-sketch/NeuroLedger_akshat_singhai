'use client';

import { useMemo } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { LocalWalletAdapter } from '../lib/LocalWalletAdapter';

console.log('[WalletProviderWrapper] Client component module loaded');

interface WalletProviderWrapperProps {
  children: React.ReactNode;
}

export default function WalletProviderWrapper({ children }: WalletProviderWrapperProps) {
  console.log('[WalletProviderWrapper] Component rendering');

  const isDev = process.env.NODE_ENV !== 'production';
  const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const useLocalWallet = isDev || isLocalhost;

  const endpoint = useMemo(() => {
    console.log('[WalletProviderWrapper] Computing endpoint');
    if (useLocalWallet) {
      console.log('[WalletProviderWrapper] Using local validator endpoint');
      return 'http://127.0.0.1:8899';
    }
    console.log('[WalletProviderWrapper] Using Devnet endpoint');
    return clusterApiUrl(WalletAdapterNetwork.Devnet);
  }, [useLocalWallet]);

  const wallets = useMemo(() => {
    console.log('[WalletProviderWrapper] Creating wallet adapters');
    try {
      const adapters = [];
      
      if (useLocalWallet) {
        console.log('[WalletProviderWrapper] Using LocalWalletAdapter for development');
        adapters.push(new LocalWalletAdapter());
      } else {
        console.log('[WalletProviderWrapper] Using PhantomWalletAdapter for production');
        adapters.push(new PhantomWalletAdapter());
      }
      
      console.log('[WalletProviderWrapper] Wallet adapters created successfully:', adapters.map((wallet) => wallet.name));
      return adapters;
    } catch (error) {
      console.error('[WalletProviderWrapper] Error creating wallet adapters:', error);
      return [];
    }
  }, [useLocalWallet]);

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