import React from 'react';
import { useContext } from 'react';
import { Eye4eyeContext } from '../context/Eye4eyeContext';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  const { eye4eyeClaim, handleChange, inputFormData } = useContext(Eye4eyeContext);



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

        <button type='button'>
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
        <button type='button'>
          Find an Existing Deal
        </button>
      </div>
    </div>
  );
};

export default Main;
