import { useEffect, useState } from 'react';
import './Landing.scss'; // Import the CSS file
import { FaArrowRight } from 'react-icons/fa';

const Landing = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className={`landing animation-ltr ${animate ? 'animate-in' : ''}`} data-delay="10">
      <div className="text-container">
        <img src="/birina-logo.png" alt="Logo" className="logo" />
        <p className="landing-container">Welcome To</p>
        <p className='landing-birina'>Birina</p>
        <p className='landing-swipe'>Keep Swiping Right <FaArrowRight /></p>
        <p className='landing-lw3'>Powered By</p>
        <img src="/lw3.png" alt="Logo" className="logo" />
      </div>
    </div>
  );
};

export default Landing;
