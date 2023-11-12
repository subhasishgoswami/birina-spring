import { useEffect, useState } from 'react';
import './Weaver.scss';

import { Link } from 'react-router-dom';
import Detail from '../Detail/Detail';



const Weaver = () => {
  const [animate, setAnimate] = useState(false);

  const [showDetail, setShowDetail] = useState(false);

  const openDetailModal = () => {
    setShowDetail(true);
  };

  const closeDetailModal = () => {
    setShowDetail(false);
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <>
    
    <div className='weaver-container'>
    <img src="./momi-payeng-card.png" className="weaver-box" />
    <p className="weaver-send">Momi Payeng</p>
    <p className="weaver">Your Weaver</p>
    <button className='weaver-button' onClick={openDetailModal}>
          Know More About Her
        </button>

        {showDetail && <Detail closeModal={closeDetailModal} />}
    
   
    </div>
    </>
  );
};

export default Weaver;