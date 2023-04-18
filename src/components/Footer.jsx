import React from 'react';
import moneyLogo from '../media/v4.gif';




const Footer = () => {
  return (
    <div className='w-full mx-auto py-8 px-0 grid lg:grid-cols-3 gap-8 text-white bg-stone-800'>
      <div>
            <img src={moneyLogo} className='pl-10' style={{ width: 140, height: 30 }}/>
            <div className='absolute right-10'><strong>GitHub:</strong>https://github.com/Olliebooth2001/fe5</div>
      </div>
    </div>
  );
};

export default Footer;
