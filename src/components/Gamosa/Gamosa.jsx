import { useEffect, useState } from 'react';
import './Gamosa.scss'; // Import the CSS file

const Landing = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    
  <div className="text-container-gamosa">
  <img src= "./gamosa-phoolam.png" className="gamosa-phoolam" />
  </div>
  );
};

export default Landing;
