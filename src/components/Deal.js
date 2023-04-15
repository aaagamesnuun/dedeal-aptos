import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useParams } from "react-router-dom";
import { Eye4eyeContext } from '../context/Eye4eyeContext';

const Deal = () => {
  const params = useParams();

  const {
    eye4eyeGrant,
    eye4eyeBuyerExecuteSeller,
    eye4eyeSellerExecuteBuyer,
    eye4eyeReleaseDeposit,
    eye4eyeGetDeal,
  } = useContext(Eye4eyeContext);

  const [deal, setDeal] = useState(null);

  const handleGrant = () => {
    eye4eyeGrant(params.dealId);
  };
  const handleBuyerExecuteSeller = () => {
    eye4eyeBuyerExecuteSeller(params.dealId);
  };
  const handleSellerExecuteBuyer = () => {
    eye4eyeSellerExecuteBuyer(params.dealId);
  };
  const handleReleaseDeposit = () => {
    eye4eyeReleaseDeposit(params.dealId);
  };
  
  const handleGetDeal = useCallback(async () => {
    const deal = await eye4eyeGetDeal(params.dealId);
    setDeal(deal);
  }, [eye4eyeGetDeal, params.dealId]);

  useEffect(() => {
    handleGetDeal();
  }, [handleGetDeal]);

  console.log(deal);
  const sellerDeposit = deal?.sellerDeposit;
  const buyerDeposit = deal?.buyerDeposit;
  const amountOfClaim = deal?.amountOfClaim;
  const parsedSellerDeposit = sellerDeposit ? sellerDeposit / 1e18 : undefined;
  const parsedBuyerDeposit = buyerDeposit ? buyerDeposit / 1e18 : undefined;
  const parsedAmountOfClaim = amountOfClaim ? amountOfClaim / 1e18 : undefined;
  const parsedDepositReleaseTime = parseInt(deal?.depositReleaseTime._hex, 16);
  const parsedDepositReleaseTimeDate = new Date(parsedDepositReleaseTime * 1000);
  const parsedExecuteDeadlineInterval = parseInt(deal?.executeDeadlineInterval._hex, 16);
  const houredParsedExecuteDeadlineInterval = parsedExecuteDeadlineInterval / 3600;
  console.log("sellerDeposit:", sellerDeposit);
  console.log("buyerDeposit:", buyerDeposit);
  console.log("amountOfClaim:", amountOfClaim);
  console.log("parsedDepositReleaseTimeDate:", parsedDepositReleaseTimeDate);
  console.log("parsedDepositReleaseTime:", parsedDepositReleaseTime);
  console.log("parsedExecuteDeadlineInterval:", parsedExecuteDeadlineInterval);
  console.log("houredParsedExecuteDeadlineInterval:", houredParsedExecuteDeadlineInterval);

  const now = Date.now() / 1000;
  console.log("now:", now);

  const isReleaseDisabled = parsedDepositReleaseTime > now;
  console.log("isReleaseDisable:", isReleaseDisabled);

  console.log("parsedSellerDeposit:", parsedSellerDeposit)
  console.log("parsedAmountOfClaim:", parsedAmountOfClaim)
  console.log("parsedSellerDeposit === parsedAmountOfClaim:", parsedSellerDeposit === parsedAmountOfClaim)

  const isGrantDisabled = !(parsedSellerDeposit === parsedAmountOfClaim && isReleaseDisabled);
  console.log("isGrantDisabled:", isGrantDisabled);
  const isSellerExecuteDisabled = !(parsedBuyerDeposit >= parsedAmountOfClaim * 2 && isReleaseDisabled);
  console.log("isSellerExecuteDisabled:", isSellerExecuteDisabled);
  const isBuyerExecuteDisabled = !(parsedSellerDeposit >= parsedAmountOfClaim * 2 && isReleaseDisabled);
  console.log("isBuyerExecuteDisabled:", isBuyerExecuteDisabled);


  return (
    <div className='mainContainer'>
      <div className="inputContainer">
      <h1 className='title'>Deal Details</h1>
      <p className='subtitle'>Deal ID:{deal ? `${deal.dealId}` : ''}</p>
        <p className='subtitle'>Payment Amount:<br/>{deal ? `${parsedAmountOfClaim}` : ''}</p>
        <p className='subtitle'>Deposit Release Time:<br/>{deal ? `${parsedDepositReleaseTimeDate}` : ''}</p>
        <p className='subtitle'>Time Added to Deposit Release<br/> Time Per Action(hour):<br/>{deal ? `${houredParsedExecuteDeadlineInterval}` : ''}</p>
      </div>

      {/*Seller*/}
      <div className="inputContainer">
        <h1 className='title'>Seller</h1>
        <p className='subtitle'>{deal ? `${deal.sellerAddress}` : ''}</p>
        <p className='subtitle'>Seller Deposit:<br/>{deal ? `${parsedSellerDeposit}` : ''}</p>        

        <button type='button' onClick={handleSellerExecuteBuyer} className={isSellerExecuteDisabled ? 'disabled-button' : ''} disabled={isSellerExecuteDisabled}>
          Execute Buyer's deposit
        </button>
        <p>To execute a buyerDeposit, the seller must add the same amount to the sellerDeposit.</p>

        <button type='button' onClick={handleReleaseDeposit} className={isReleaseDisabled ? 'disabled-button' : ''} disabled={isReleaseDisabled}>
          Release deposit
        </button>
        <p>To release the deposit, the seller must wait until the depositReleaseTime. After the Deposit Release Time, no other actions can be taken.</p>
        
      </div>



      {/*Buyer*/}
      <div className="inputContainer">
        <h1 className='title'>Buyer</h1>
        <p className='subtitle'>{deal ? `${deal.buyerAddress}` : ''}</p>
        <p className='subtitle'>Buyer Deposit:<br/>{deal ? `${parsedBuyerDeposit}` : ''}</p>

        <button type='button' onClick={handleGrant} className={isGrantDisabled ? 'disabled-button' : ''} disabled={isGrantDisabled}>
          Grant
        </button>
        <p>To grant, the seller must add the same amount to the sellerDeposit.</p>

        <button type='button' onClick={handleBuyerExecuteSeller} className={isBuyerExecuteDisabled ? 'disabled-button' : ''} disabled={isBuyerExecuteDisabled}>
          Execute Seller's deposit
        </button>
        <p>To execute a Seller Deposit, the Buyer must add the same amount to the Buyer Deposit. Also, Grant must be done in advance. </p>

        <button type='button' onClick={handleReleaseDeposit} className={isReleaseDisabled ? 'disabled-button' : ''} disabled={isReleaseDisabled}>
          Release deposit
        </button>
        <p>To release the deposit, the buyer must wait until the depositReleaseTime. After the Deposit Release Time, no other actions can be taken.</p>

      </div>


    </div>
  );
}

export default Deal;
