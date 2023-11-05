import { useEffect, useState } from 'react';
import './Gamosa.scss'; // Import the CSS file

const Landing = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (

    <div className='gamosa-container'>
    <p className="gamosa-h1">Your Gamosa Came From</p>
    <p className="gamosa-h2">Merapani, Golaghat</p>
    </div>
  );
};

export default Landing;
