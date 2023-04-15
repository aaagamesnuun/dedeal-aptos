import { ethers } from "ethers";
import { createContext, useEffect } from "react";
import { contractABI, networks } from "../utils/connect";
import React, { useState } from "react";
export const Eye4eyeContext = createContext();

const { ethereum } = window;

export const Eye4eyeProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentNetwork, setCurrentNetwork] = useState("");
  const [inputFormData, setInputFormData] = useState({
    _amountOfClaim: "",
    _grantDeadline: "",
    _executeDeadlineInterval: "",
  });
  const [inputDealIdData] = useState({
    _dealId: "",
  });
  // Get the smart contract
// const getSmartContract = async () => {
//   const provider = new ethers.providers.Web3Provider(ethereum);
//   const signer = provider.getSigner();

//   const network = await provider.getNetwork();
  
//   // currentNetworkがnetworksに存在するか確認
//   // なければ、alertでエラーを出す

//   if(!networks[currentNetwork]){
//     alert("Please change network to the network \n" + (Object.values(networks).map((network) => network.name)).join("\nor "))
//     return;
//   }
//   // Eye4eyeProvider.currentNetwork = provider.network;
//   // const currentNetwork = provider.network;
//   const eye4eyeContract = new ethers.Contract(
//     contractAddress,
//     contractABI,
//     signer
//   );

//   console.log(provider, signer, eye4eyeContract);
const getSmartContract = async () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();


  const network = await provider.getNetwork();
  setCurrentNetwork(network.chainId);

  

  if (!networks[currentNetwork]) {
    alert(
      "Please change network to the network \n" +
        Object.values(networks)
          .map((network) => network.name)
          .join("\nor ")
    );
    return;
  }

  const eye4eyeContract = new ethers.Contract(
    networks[currentNetwork].contractAddress,
    contractABI,
    signer
  );

  return eye4eyeContract;
};

const getReadOnlySmartContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const eye4eyeContract = new ethers.Contract(
    networks[currentNetwork].contractAddress,
    contractABI,
    provider
  );

  console.log(provider, eye4eyeContract);

  return eye4eyeContract;
};


  const handleChange = (e, name, convertToSeconds = false) => {
    let value = e.target.value;
    if (convertToSeconds === true) {
      value = value * 3600;
    }
    setInputFormData((prevInputFormdata) => ({
      ...prevInputFormdata,
      [name]: value,
    }));
  };
  const checkMetamaskWalletConnected = async () => {
    if (!ethereum)
      return alert(
        "Access from your Metamask browser or from Chrome on your PC."
      );

    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);
  };

  useEffect(() => {
    checkMetamaskWalletConnected();
  }, []);

  useEffect(() => {
    const msgCatch = (_msgValue) => {
      console.log("_msgValue:", _msgValue);
    };
    
    if (ethereum && currentNetwork && networks[currentNetwork]) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contractAddress = networks[currentNetwork].contractAddress;
  
      if (contractAddress) {
        const eye4eyeContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const filter = eye4eyeContract.filters.eventMsgValue(null);
        eye4eyeContract.on(filter, msgCatch);
      } else {
        console.warn(`No contract address found for the current network (${currentNetwork}).`);
      }
    }
  }, [currentNetwork]);

  const connectWallet = async () => {
    if (!ethereum) return alert("Install Metamask");

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("connected wallet: %s", accounts[0]);
    setCurrentAccount(accounts[0]);
  };

  const getCurrentAccount = () => {
    return currentAccount;
  };

  const getCurrentNetwork = () => {
    const provider = new ethers.providers.Web3Provider(ethereum, "any");

    provider.on("network", (newNetwork, oldNetwork) => {
        // When a Provider makes its initial connection, it emits a "network"
        // event with a null oldNetwork along with the newNetwork. So, if the
        // oldNetwork exists, it represents a changing network
        if (oldNetwork) {
            window.location.reload();
        }
        setCurrentNetwork(newNetwork.chainId);
    });
    return currentNetwork;
  };

    const eye4eyeClaim =async () => {
        if (!ethereum) return alert("Install Metamask");
        console.log("eye4eyeClaim");
        const {_amountOfClaim, _grantDeadline, _executeDeadlineInterval} = inputFormData;

        const eye4eyeContract = await getSmartContract();
        const parsed_AmountOfClaim = ethers.utils.parseEther(_amountOfClaim);

        //eventDealをキャッチし、生成されたdealIdに基づいて生成されたURLに遷移させる
        const eventDealCatch = (_deal) => {
            console.log("_deal:", _deal);

            const ROOT_URL = "deal";
            const pageId = parseInt(_deal.dealId._hex, 16);
            console.log(pageId);
            const pageUrl = `${ROOT_URL}/${pageId}`;
            //window.open(pageUrl);//別のタブでURLを開く
            window.location.href = pageUrl;//URLを同じタブで遷移させる
        };
        const filter = eye4eyeContract.filters.eventDeal(null);
        eye4eyeContract.on(filter, eventDealCatch);

        const overrides = {
            gasLimit: 400000,
            value: parsed_AmountOfClaim._hex
          };

        const eye4eyeClaimHash = await eye4eyeContract.claim(
            _grantDeadline,
            _executeDeadlineInterval,
            overrides,
        );

        console.log('Loading...eye4eyeClaimHash.hash');

        await eye4eyeClaimHash.wait();

        console.log('Successful transfer!eye4eyeClaimHash.hash');
    };

    const eye4eyeGrant =async (_dealId) => {
        if (!ethereum) return alert("Install Metamask");
        console.log("eye4eyeGrant");
        console.log("_dealId:", _dealId);
        const eye4eyeContract = await getSmartContract();

        const eye4eyeGetDealHash = await eye4eyeContract.getDeal(
            _dealId,
        );

        const amountOfClaimed = eye4eyeGetDealHash.amountOfClaim
        console.log("amountOfClaimed:", amountOfClaimed);
        console.log("amountOfClaimed._hex:", amountOfClaimed._hex);

        //eventDealをキャッチ
        const eventDealCatch = (_deal) => {
            console.log("_deal:", _deal);
        };
        const filter = eye4eyeContract.filters.eventDeal(null);
        eye4eyeContract.on(filter, eventDealCatch);

        const overrides = {
            gasLimit: 400000,
            value: amountOfClaimed._hex, 
          };

        const eye4eyeGrantHash = await eye4eyeContract.grant(
            _dealId,
            overrides,
        );

        console.log('Loading...eye4eyeGrantHash');

        await eye4eyeGrantHash.wait();

        console.log('Successful transfer!eye4eyeGrantHash');
    };


    const eye4eyeBuyerExecuteSeller =async (_dealId) => {
        if (!ethereum) return alert("Install Metamask");
        console.log("eye4eyeBuyerExecuteSeller");
        console.log("_dealId:", _dealId);
        const eye4eyeContract = await getSmartContract();

        const eye4eyeGetDealHash = await eye4eyeContract.getDeal(
            _dealId,
        );

        console.log("eye4eyeGetDealHash:", eye4eyeGetDealHash);

        const amountOfDepositHex = doubleHexValue(eye4eyeGetDealHash.amountOfClaim._hex);
        console.log("amountOfDepositHex:", amountOfDepositHex);
        console.log("amountOfClaim._hex:", eye4eyeGetDealHash.amountOfClaim._hex);

        //eventGrantをキャッチ
        const eventDealCatch = (_deal) => {
            console.log("_deal:", _deal);
        };
        const filter = eye4eyeContract.filters.eventDeal(null);
        eye4eyeContract.on(filter, eventDealCatch);

        const overrides = {
            gasLimit: 400000,
            value: amountOfDepositHex, 
          };

        const eye4eyeBuyerExecuteSellerHash = await eye4eyeContract.buyerExecuteSeller(
            _dealId,
            overrides,
        );

        console.log('Loading...eye4eyeBuyerExecuteSellerHash');

        await eye4eyeBuyerExecuteSellerHash.wait();

        console.log('Successful transfer!eye4eyeBuyerExecuteSellerHash');
    };

    const eye4eyeSellerExecuteBuyer =async (_dealId) => {
        if (!ethereum) return alert("Install Metamask");
        console.log("eye4eyeSellerExecuteBuyer");
        console.log("_dealId:", _dealId);
        const eye4eyeContract = await getSmartContract();

        const eye4eyeGetDealHash = await eye4eyeContract.getDeal(
            _dealId,
        );

        console.log("eye4eyeGetDealHash:", eye4eyeGetDealHash);

        const amountOfDepositHex = doubleHexValue(eye4eyeGetDealHash.amountOfClaim._hex);
        console.log("amountOfDepositHex:", amountOfDepositHex);
        console.log("amountOfClaim._hex:", eye4eyeGetDealHash.amountOfClaim._hex);

        //eventGrantをキャッチ
        const eventDealCatch = (_deal) => {
            console.log("_deal:", _deal);
        };
        const filter = eye4eyeContract.filters.eventDeal(null);
        eye4eyeContract.on(filter, eventDealCatch);

        const overrides = {
            gasLimit: 400000,
            value: amountOfDepositHex, 
          };

        const eye4eyeSellerExecuteBuyerHash = await eye4eyeContract.sellerExecuteBuyer(
            _dealId,
            overrides,
        );

        console.log('Loading...eye4eyeSellerExecuteBuyerHash');

        await eye4eyeSellerExecuteBuyerHash.wait();

        console.log('Successful transfer!eye4eyeSellerExecuteBuyerHash');
    }

    const eye4eyeReleaseDeposit =async (_dealId) => {
        if (!ethereum) return alert("Install Metamask");;
        console.log("eye4eyeReleaseDeposit");
        console.log("_dealId:", _dealId);
        const eye4eyeContract = await getSmartContract();

        const eye4eyeGetDealHash = await eye4eyeContract.getDeal(
            _dealId,
        );

        console.log("eye4eyeGetDealHash:", eye4eyeGetDealHash);

        //eventGrantをキャッチ
        const eventDealCatch = (_deal) => {
            console.log("_deal:", _deal);
        };
        const filter = eye4eyeContract.filters.eventDeal(null);
        eye4eyeContract.on(filter, eventDealCatch);

        const overrides = {
            gasLimit: 400000,
          };

        const eye4eyeReleaseDepositsHash = await eye4eyeContract.releaseDeposits(
            _dealId,
            overrides,
        );

        console.log('Loading...eye4eyeReleaseDepositsHash');

        await eye4eyeReleaseDepositsHash.wait();

        console.log('Successful transfer!eye4eyeReleaseDepositsHash');
    };

    function doubleHexValue(hexValue) {
        let decimalValue = parseInt(hexValue, 16);
        let doubledValue = decimalValue * 2;
        let added0xDoubledValue = '0x' + doubledValue.toString(16);
        return added0xDoubledValue;
    };

    const eye4eyeGetDeal = async (_dealId) => {
      if (!ethereum) return alert("Install Metamask");
      const eye4eyeContract = getReadOnlySmartContract();
    
      const eye4eyeGetDealHash = await eye4eyeContract.getDeal(_dealId);
    
      console.log("eye4eyeGetDealHash:", eye4eyeGetDealHash);
      console.log("DealID:", eye4eyeGetDealHash.dealId);
    
      return eye4eyeGetDealHash;
    };

    return (
      <Eye4eyeContext.Provider
        value={{
          connectWallet,
          eye4eyeClaim,
          eye4eyeGrant,
          eye4eyeBuyerExecuteSeller,
          eye4eyeSellerExecuteBuyer,
          eye4eyeReleaseDeposit,
          eye4eyeGetDeal,
          handleChange,
          inputFormData,
          inputDealIdData,
          getCurrentAccount,
          getCurrentNetwork,
        }}
      >
        {children}
      </Eye4eyeContext.Provider>
    );
  };