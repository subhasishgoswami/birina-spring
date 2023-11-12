import { useEffect, useState } from 'react';
import './Ending.scss'; // Import the CSS file


const Ending = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className={`landing animation-ltr ${animate ? 'animate-in' : ''}`} data-delay="10">
    <div className="text-container">
    <img src= "/birina-logo.png" alt="Logo" className="logo" />
      <p className="landing-container">Thank You</p>
      <p className='landing-birina'>Birina</p>
    </div>
    </div>
  );
};

export default Ending;
