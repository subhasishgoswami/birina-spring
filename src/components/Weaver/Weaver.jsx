import { useEffect, useState } from 'react';
import './Weaver.scss';

import { Link } from 'react-router-dom';
import Detail from '../Detail/Detail';



const Weaver = (gamosa) => {
  const [animate, setAnimate] = useState(false);

  const [showDetail, setShowDetail] = useState(false);

  const [weaverGamosa, setWeaver] = useState(gamosa.gamosa == 1 ? 'Momi Payeng' : gamosa.gamosa == 2 ? 'Malabika Charo Pegu' : 'Urvashi Pegu');

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
    
    <div className="weaver-container">
    <img src={`./weaver-gamosa-${gamosa.gamosa}.png`} className="weaver-box" />
    <p className="weaver-send">{weaverGamosa}</p>
    <p className="weaver">Your Weaver</p>
    <button className='weaver-button' onClick={openDetailModal}>
          Know More About Her
        </button>

        {showDetail && <Detail closeModal={closeDetailModal} gamosa= {gamosa} />}
    
   
    </div>
    </>
  );
};

export default Weaver;