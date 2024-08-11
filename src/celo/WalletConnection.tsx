import React, { useState, useEffect } from 'react';
import { useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors'

const WalletConnection: React.FC = () => {
  const [isMiniPay, setIsMiniPay] = useState(false);
  const { connect } = useConnect({
    connector: injected(),
  });

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMiniPay) {
      // User is using MiniPay so set the state and connect wallet
      setIsMiniPay(true);
      connect({ connector: injected() })
    }
  }, [connect]);

  return (
    <div>
      {/* Conditional rendering of Connect Wallet button */}
      {!isMiniPay && (
        <button onClick={() => connect({ connector: injected() })}>
          Connect Wallet
        </button>
      )}
      {isMiniPay && <p>Connected via MiniPay</p>}
    </div>
  );
};

export default WalletConnection;
