import { useEffect, useState } from 'react';
import './NFT.scss';

const NFT = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (

    <div className='nft-container'>
    <p className="nft">Claim The Digital</p>
    <p className='nft'>Version Of Your Gamosa</p>
    <img src="./nft-box.png" className="nft-box" />
    <button className='nft-button'>Claim Your NFT</button>
    
    </div>
  );
};

export default NFT;
