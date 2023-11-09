import { useEffect, useState } from 'react';
import './Weaver.scss';

const Weaver = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (

    <div className='weaver-container'>
    <img src="./momi-payeng-card.png" className="weaver-box" />
    <p className="weaver-send">Momi Payeng</p>
    <p className="weaver">Your Weaver</p>
    <button className='weaver-button'>Know More About Her</button>
    </div>
  );
};

export default Weaver;
