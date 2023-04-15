import React, { useContext, useState, useEffect } from 'react';
import { Eye4eyeContext } from '../context/Eye4eyeContext';
import { networks } from '../utils/connect';


const Navbar = () => {
  const { connectWallet, getCurrentAccount, getCurrentNetwork } = useContext(Eye4eyeContext);
  const [accountAddress, setAccountAddress] = useState('');
  const [currentNetwork, setCurrentNetwork] = useState('');

  useEffect(() => {
    const currentAccount = getCurrentAccount();
    console.log('currentAccount:', currentAccount);
    const currentNetwork = getCurrentNetwork();
    if (currentAccount) {
      setAccountAddress(currentAccount.slice(0, 6) + '...' + currentAccount.slice(-4));
    } else {
      setAccountAddress('unconnected');
    }
    setCurrentNetwork(currentNetwork);
  }, [getCurrentAccount, getCurrentNetwork]);

  return (
    <nav>
      <div className="logo">
        <h2>
          <a href="/">DeDeal</a>
        </h2>
      </div>
      <div className="wallet-info">
        <span className='wallet-address'>
          {networks[currentNetwork] ? networks[currentNetwork]?.name : "change network"}
        </span>
        <span className="wallet-address">{accountAddress}</span>
        <button type="button">
          <p className="buttonText" onClick={connectWallet}>
            Connect Wallet
          </p>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
