import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Eye4eyeContext } from '../context/Eye4eyeContext';

const Deal = () => {
  const params = useParams();
  const { eye4eyeGetDeal } = useContext(Eye4eyeContext);

  const [deal, setDeal] = useState(null);

  useEffect(() => {
  }, []);

  return (
    <div className='mainContainer'>
      <h1 className='title'>Deal Details</h1>
      <p className='subtitle'>Deal ID: {params.dealId}</p>
    </div>
  );
}

export default Deal;