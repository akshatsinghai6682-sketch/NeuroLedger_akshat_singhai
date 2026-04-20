import type { AppProps } from 'next/app';
import WalletProviderWrapper from '../components/WalletProviderWrapper';

import '../styles/solana-wallet-adapter.css';
import '../styles/globals.css';

console.log('[_app.tsx] Server component module loaded');

function MyApp({ Component, pageProps }: AppProps) {
  console.log('[_app.tsx] App component rendering');

  return (
    <WalletProviderWrapper>
      <Component {...pageProps} />
    </WalletProviderWrapper>
  );
}

export default MyApp;
