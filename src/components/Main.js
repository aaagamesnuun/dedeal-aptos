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

      </div>

      <div className="inputContainer">
      </div>
    </div>
  );
};

export default Main;
