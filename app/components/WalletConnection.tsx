'use client';

import dynamic from 'next/dynamic';
import { useWallet } from '@solana/wallet-adapter-react';

if (typeof window !== 'undefined') {
  console.log('[WalletConnection] Module loading in browser');
}

const WalletMultiButtonDynamic = dynamic(
  async () => {
    console.log('[WalletConnection] Dynamically importing WalletMultiButton');
    const module = await import('@solana/wallet-adapter-react-ui');
    console.log('[WalletConnection] WalletMultiButton imported successfully');
    return module.WalletMultiButton;
  },
  { ssr: false, loading: () => <div>Loading wallet...</div> }
);

export default function WalletConnection() {
  console.log('[WalletConnection] Component rendering');
  const { connected, publicKey } = useWallet();
  console.log('[WalletConnection] Wallet state:', { connected, publicKey: publicKey?.toString() });

  return (
    <div className="flex items-center gap-4">
      {connected && publicKey && (
        <div className="hidden sm:block px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
          <p className="text-sm text-slate-400">
            Connected: <span className="text-cyan-400 font-mono">{publicKey.toString().slice(0, 8)}...</span>
          </p>
        </div>
      )}
      <WalletMultiButtonDynamic style={{ backgroundColor: '#0891b2', borderRadius: '0.375rem' }} />
    </div>
  );
}
