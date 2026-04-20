"use client";

import { useMemo } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import type { AppProps } from 'next/app';

import '../styles/solana-wallet-adapter.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  console.log('[_app.tsx] App initializing');
  
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => {
    console.log('[_app.tsx] Computing endpoint');
    return clusterApiUrl(network);
  }, [network]);
  
  const wallets = useMemo(() => {
    console.log('[_app.tsx] Initializing wallet adapters');
    return [new PhantomWalletAdapter()];
  }, [network]);
  
  console.log('[_app.tsx] Providers rendering with endpoint:', endpoint);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default MyApp;
