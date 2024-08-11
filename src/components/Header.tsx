"use client"
import { useEffect, useState } from "react";
import 
export default function Header() {
    // State variable that determines whether to hide the button or not.
    const [hideConnectBtn, setHideConnectBtn] = useState(false);
    const { connect } = useConnect();
  
    useEffect(() => {
      if (window.ethereum && window.ethereum.isMiniPay) {
        // User is using MiniPay so hide connect wallet button.
        setHideConnectBtn(true);
  
        connect({ connector: injected({ target: "metaMask" }) });
      }
    }, []);
  
    return (
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        {/* Conditional rendering of Connect Wallet button */}
        {!hideConnectBtn && (

        )}
      </div>
    );
  }