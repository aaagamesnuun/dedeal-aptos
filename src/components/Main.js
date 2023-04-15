import React from 'react';
import { useContext } from 'react';
import { Eye4eyeContext } from '../context/Eye4eyeContext';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  const { eye4eyeClaim, handleChange, inputFormData } = useContext(Eye4eyeContext);

  const handleSubmit = () => {
    const { _amountOfClaim, _grantDeadline, _executeDeadlineInterval } = inputFormData;
    console.log("_amountOfClaim : %s", _amountOfClaim);
    console.log("_grantDeadline : %s", _grantDeadline);
    console.log("_executeDeadlineInterval : %s", _executeDeadlineInterval);

    if (_amountOfClaim === "" || _grantDeadline === "" || _executeDeadlineInterval === "") {
      console.log("There are empty input fields.");
      return;
    } else {
      eye4eyeClaim();
    }
  };
  

  const handleFindDeal = () => {
    const { dealId } = inputFormData;
    navigate(`/deal/${dealId}`);
  };

  return (
    <div className='mainContainer'>
      <div className="inputContainer">
        <h1 className='title'>Seller</h1>

        <input
          type="number"
          placeholder='Payment Amount'
          name="_amountOfClaim"
          step="0.0001"
          onChange={(e) => handleChange(e, "_amountOfClaim")}
        />

        <p>The price of the item that the seller and buyer add to the seller deposit.</p>

        <input
          type="number"
          placeholder='Deadline for buyer to pay(hour)'
          name="_grantDeadline"
          onChange={(e) => handleChange(e, "_grantDeadline", true)}
        />

        <p>The deadline for the buyer to pay the seller deposit.</p>

        <input
          type="number"
          placeholder='Time Added to Deposit Release Time Per Action(hour)'
          name="_executeDeadlineInterval"
          step="1"
          onChange={(e) => handleChange(e, "_executeDeadlineInterval", true)}
        />

        <p>Time to deadline that extends each time the seller and buyer execute or grant.</p>

        <button type='button' onClick={handleSubmit}>
          Make a New Deal
        </button>

      </div>

      <div className="inputContainer">
        <input
          type="number"
          placeholder='Deal ID'
          name="dealId"
          step="1"
          onChange={(e) => handleChange(e, "dealId")}
        />
        <button type='button' onClick={handleFindDeal}>
          Find an Existing Deal
        </button>
      </div>
    </div>
  );
};

export default Main;
